const firebaseConfig = {
  apiKey: "AIzaSyBVvkKKH34_QdejebYJ4paZYSy_wF52zSM",
  authDomain: "nsync-app.firebaseapp.com",
  databaseURL: "https://nsync-app.firebaseio.com",
  projectId: "nsync-app",
  storageBucket: "nsync-app.appspot.com",
  messagingSenderId: "546758090026",
  appId: "1:546758090026:web:751f3d76dcb30c10319253"
};
const firebase = require("firebase/app");

// Add the Firebase products that you want to use
require("firebase/database");

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

const Refs = {
  queue: 'queue',
  game: 'game',
  kiosk: 'kiosk'
};

var gameStartListener;
var gameChangeListener;

const Api = {};

Api.pushQueue = (kiosk, price) => {
  let data = {kiosk, price};
  // add to the queue
  db.ref(Refs.queue).once('value').then(s => {
    let q = s.val() || [];
    if (!q) q = [];
    q.push(data);
    db.ref(Refs.queue).set(q);
    db.ref(Refs.kiosk + '/' + kiosk).set('');
  })
}

Api.popQueue = (cb) => {
  // remove and return first item in queue
  db.ref(Refs.queue).once('value').then(s => {
    let q = s.val() || [];
    if (!q) q = [];
    if (q.length < 1) cb(null)
    else cb(q.shift())
    db.ref(Refs.queue).set(q);
  })
}

Api.startGame = (player1, player2, gameState, cb) => {
  let data = {
    player1,
    player2,
    gameState
  }
  // create new game with two players
  let gameId = db.ref(Refs.game).push(data).key;
  // update kiosks with gameId
  db.ref(Refs.kiosk + '/' + player1.kiosk).update({gameId})
  db.ref(Refs.kiosk + '/' + player2.kiosk).update({gameId})
  cb(gameId);
  // trigger an update
  const randomValue = Math.floor((Math.random() * 10));
  setTimeout(() => {
    db.ref(Refs.game + '/' + gameId).update({
      turn: randomValue % 2 === 0 ? 'player1' : 'player2',
      isX: true
    });
  }, 1000);
}

Api.updateGame = (gameId, gameState, turn, isX) => {
  // update gamestate
    db.ref(Refs.game + '/' + gameId).update({gameState, turn, isX});
}

Api.listenForGameStart = (kiosk, cb) => {
  // listen to kiosk ref for gameId
  console.log("waiting for game to start", kiosk);
  gameStartListener = db.ref(Refs.kiosk).on('child_changed', d => {
    if (d.key !== kiosk) return;
    let { gameId } = d.val();
    cb(gameId);
  })
}

Api.listenForGameChange = (gameId, cb) => {
    // listen to game ref
    console.log("waiting for game changes", gameId);
    gameChangeListener = db.ref(Refs.game).on('child_changed', d => {
      if (d.key !== gameId) return;
      let data = d.val();
      cb(data);
    })
}

Api.removeKiosk = (kiosk) => {
  db.ref(Refs.queue).once('value').then(s => {
    let q = s.val() || [];
    if (!q) q = [];
    let newQueue = [];
    if (q.length > 0) {
      q.forEach(i => {
        if (i.kiosk !== kiosk) {
          newQueue.push(i);
        }
      })
      db.ref(Refs.queue).set(newQueue);
    }
  })
  if (gameStartListener) db.ref(Refs.kiosk).off('child_changed', gameStartListener);
  db.ref(Refs.kiosk + '/' + kiosk).remove()
}

Api.endGame = (gameId) => {
  // remove listeners
  if (gameStartListener) db.ref(Refs.kiosk).off('child_changed', gameStartListener);
  if (gameChangeListener) db.ref(Refs.game).off('child_changed', gameChangeListener);

  // remove kiosks
  db.ref(Refs.game + '/' + gameId).once('value').then(s => {
    let data = s.val();
    let { player1, player2 } = data;
    db.ref(Refs.kiosk + '/' + player1.kiosk).remove();
    db.ref(Refs.kiosk + '/' + player2.kiosk).remove();
  })
  // remove game
  db.ref(Refs.game + '/' + gameId).remove()
}

export default Api;
