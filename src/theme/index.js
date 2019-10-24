import Colors from './colors';

export default class Theme {
  static DEFAULT = 'DefaultColors';
  static DARK = 'DarkColors';
  static AUTUMN = 'AutumnColors';

  constructor() {
    this.init();
  }

  init(colors = Theme.DEFAULT) {
    this.currentTheme = colors;
    this.colors = Colors[colors] || Colors[Theme.DEFAULT];

    // https://system-ui.com/theme/

    // layout
    this.sizes = {
        xs: '1rem', // 16px
        sm: '1.5rem', // 24px
        md: '2.5rem', // 40px
        lg: '4rem', // 64px
        xl: '5rem' // 80px
    };

    // typography
    this.fontSizes = {
        xs: '11px',
        sm: '14px',
        md: '18px',
        lg: '24px',
        xl: '32px',
        xxl: '48px'
    };
    this.lineHeights = {
        xs: '1rem', // 16px
        sm: '1.5rem', // 24px
        md: '2.5rem', // 40px
        lg: '4rem', // 64px
        xl: '5rem' // 80px
    };
    this.fonts = {
      default: 'Roboto',
    }
    this.fontWeights = {
      regular: 400,
      bold: 700,
    };
    this.letterSpacings = {};

    // space (margins/paddings)
    this.space = {
        xs: '.25rem', // 4px
        sm: '.5rem', // 8px
        md: '1rem', // 16px
        lg: '1.5rem', // 24px
        xl: '2.5rem', // 40px
    };

    // border
    this.radii = {
        sm: '.25rem', //4px
        md: '.5rem', // 8px
        lg: '1rem', // 16px
    };
    this.borderWidths = {};
    this.borderStyles = {};
    this.borders = {};

    // shadow
    this.shadows = {
      xs: '1px 1px 10px rgba(0,0,0,0.1)',
      sm: '2px 2px 10px rgba(0,0,0,0.2)',
      md: '3px 3px 10px rgba(0,0,0,0.3)',
      lg: '4px 4px 10px rgba(0,0,0,0.4)',
      xl: '5px 5px 10px rgba(0,0,0,0.5)',
    }

    // position
    this.zIndices = {}

    // section values
    this.headerHeight = 64;
  }

  static self = new Theme()
  static setTheme(newTheme) {
    Theme.self.init(newTheme);
  }
}
