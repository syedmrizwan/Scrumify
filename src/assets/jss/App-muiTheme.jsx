// ##############################
// // // Variables - Styles that are set to App Material default theme
// #############################

export default {
  palette: {
    type: 'light',
    common: {
      white: "#fff",
      dark: "#333"
    },
    secondary: {
      xLight: 'rgba(0,0,0, 0.5)',
      light: "#445A64",
      main: "#263238",
      dark: "#000000",
      contrastText: "#fff"
    },
    primary: {
      light: "#6E70C1",
      main: "#9864FF",
      dark: "#6650F9",
      contrastText: "#fff"
    }
  },
  typography: {
    useNextVariants: true,

    h1: { fontWeight: '500' },
    h2: { fontWeight: '500' },
    h3: { fontWeight: '500' },
    h4: { fontWeight: '500' },
    h5: { fontWeight: '500' },
    h6: { fontWeight: '500' },
    h7: { fontWeight: '500', fontSize: '1rem', textTransform: 'uppercase' },
    subtitle1: {
      fontSize: '1.1rem',
      fontWeight: '500'
    }

  },
  overrides: {
    MuiButton: { // Name of the component ⚛️ / style sheet
      root: { // Name of the rule
        padding: '12px 40px'
      },
      raised: {
        boxShadow: '-1px 10px 20px rgba(0,0,0,.2)'
      },
      contained: {
        boxShadow: '-1px 10px 20px rgba(0,0,0,.2)'
      },
      outlinedSecondary: {
        borderColor: 'rgba(0,0,0,.18)'
      },
      label: {
        fontSize: '12px',
        fontWeight: '500',
        textTransform: 'uppercase'
      }
    },
    MuiPaper: {
      root: {

      },
      elevation1: {
        boxShadow: '0px 11px 15px -7px rgba(0, 0, 0, 0.02), 0px 24px 38px 3px rgba(0, 0, 0, 0.02), 0px 9px 46px 8px rgba(0, 0, 0, 0.08)'
      },
      elevation2: {
        boxShadow: '0px 11px 15px -7px rgba(0, 0, 0, 0.02), 0px 24px 38px 3px rgba(0, 0, 0, 0.02), 0px 9px 46px 8px rgba(0, 0, 0, 0.08)'
      }
    },
    MuiCard: {
      root: {
        boxShadow: '0px 11px 15px -7px rgba(0, 0, 0, 0.01), 0px 24px 38px 3px rgba(0, 0, 0, 0.01), 0px 9px 46px 8px rgba(0, 0, 0, 0.06)'
      }
    },
    MuiInputLabel: {
      root: {
        fontSize: '15px',
        letterSpacing: '0.2px'
      }
    },
    MuiInput: {
      underline: {
        '&:before': {
          borderBottom: '1px solid rgba(0,0,0,.18)'
        }
      }
    },
    MuiListItemText: {
      primary: {
        fontSize: '14px'
      }
    },
    MuiListItemIcon: {
      root: {
        marginRight: '0'
      }
    },
    MuiMenuItem: {
      root: {
        fontSize: '14px',
        height: '12px'
      }
    },
    MuiNativeSelect: {
      root: {
        fontSize: '14px'
      }
    }
  },
};

// ##############################
// // // Variables - Styles that are used on more than one component
// #############################

const drawerWidth = 280;
const appBarHeight = 60;
const drawerItemsHeight = '85vh';
const contentMinHeight = 500;

export {
  //variables
  drawerWidth,
  appBarHeight,
  drawerItemsHeight,
  contentMinHeight
};

