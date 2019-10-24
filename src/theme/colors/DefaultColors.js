let Colors = {};

// color functions
Colors.rgba = (r,g,b,a) => 'rgba(' + r +',' + g + ',' + b + ',' + a + ')';
Colors.rgb = (r,g,b) => Colors.rgba(r,g,b,1);
Colors.gray = (v, a) => Colors.rgba(v,v,v, a || 1);

// constant colors
Colors.primary = '#2555D9';
Colors.primary2 = '#4C73DF';
Colors.primary3 = '#7492E6';
Colors.primary4 = '#9BB1ED';
Colors.primary5 = '#C3D0F4';
Colors.primary6 = '#EBEFF8';
Colors.greyscale1 = '#22212D';
Colors.greyscale2 = '#4A4953';
Colors.greyscale3 = '#727179';
Colors.greyscale4 = '#9A9A9F';
Colors.greyscale5 = '#C2C2C5';
Colors.greyscale6 = '#EAEAEB';
Colors.white = '#FFF';
Colors.danger = '#FF4C5B';
Colors.success = '#00BF6F';
Colors.negative = '#9A9A9F';

Colors.dark = Colors.greyscale1;
Colors.light = Colors.greyscale6;

Colors.darken = 'rgba(0,0,0,.25)';
Colors.lighten = 'rgba(255,255,255,.25)';

// section colors
Colors.background = Colors.white;
Colors.text = Colors.greyscale1;
Colors.lightText = Colors.white;
Colors.border = Colors.greyscale5;
Colors.fill = Colors.white;
Colors.focus = Colors.primary4;

export default Colors;
