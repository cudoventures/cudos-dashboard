import { darkScrollbar } from '@mui/material'
import { createTheme } from '@mui/material/styles'
import { COLORS_DARK_THEME, CONDITIONS } from './colors'

const dark = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      light: '',
      main: COLORS_DARK_THEME.PRIMARY_BLUE,
      dark: ''
    },
    background: {
      default: COLORS_DARK_THEME.DARK_BACKGROUND,
      paper: COLORS_DARK_THEME.DARK_BACKGROUND
    },
    text: {
      primary: COLORS_DARK_THEME.PRIMARY_TEXT,
      secondary: COLORS_DARK_THEME.SECONDARY_TEXT
    }
  },
  typography: {
    fontFamily: ['Poppins', 'sans-serif'].join(','),
    fontSize: 14
  },
  components: {
    MuiSelect: {
      styleOverrides: {
        select: {
          padding: '0.9rem, 1.2rem',
          fontSize: '0.9rem',
          '&:before': {
            border: 'none'
          }
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          borderRadius: '26px',
          background: COLORS_DARK_THEME.PRIMARY_BLUE,
          color: 'white',
          padding: '10px 20px 10px 20px',
          textTransform: 'none',
          '&:hover': {
            background: COLORS_DARK_THEME.PRIMARY_BLUE_HOVER
          },
          '&:click': {
            background: COLORS_DARK_THEME.PRIMARY_BLUE_CLICK
          },
          '&:disabled': {
            background: COLORS_DARK_THEME.PRIMARY_BLUE_DISABLED
          }
        },
        containedSecondary: {
          borderRadius: '26px',
          background: COLORS_DARK_THEME.SECONDARY_BLUE,
          color: COLORS_DARK_THEME.PRIMARY_BLUE,
          padding: '10px 20px 10px 20px',
          textTransform: 'none',
          '&:hover': {
            background: COLORS_DARK_THEME.SECONDARY_BLUE_HOVER
          },
          '&:click': {
            background: COLORS_DARK_THEME.SECONDARY_BLUE_CLICK
          },
          '&:disabled': {
            background: COLORS_DARK_THEME.SECONDARY_BLUE_DISABLED
          }
        },
        textPrimary: {
          color: COLORS_DARK_THEME.PRIMARY_BLUE,
          fontWeight: 700,
          textTransform: 'none',
          '&:hover': {
            textDecoration: 'underline 2px',
            background: 'none'
          }
        }
      }
    },
    MuiInput: {
      styleOverrides: {
        root: {
          '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button':
            {
              display: 'none'
            },
          '& input[type=number]': {
            MozAppearance: 'textfield'
          }
        }
      }
    },
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          ...darkScrollbar({
            track: 'transparent',
            thumb: COLORS_DARK_THEME.SECONDARY_TEXT,
            active: 'transparent'
          }),
          '*::-webkit-scrollbar': {
            width: '4px'
          },
          '*::-webkit-scrollbar-thumb': {
            background: COLORS_DARK_THEME.SECONDARY_TEXT,
            borderRadius: '2px'
          }
        }
      }
    },
    MuiTable: {
      styleOverrides: {
        root: {
          background: COLORS_DARK_THEME.PRIMARY_BACKGROUND,
          boxShadow: 'none',
          borderRadius: '5px',
          borderCollapse: 'collapse',
          overflow: 'hidden'
        }
      }
    },
    MuiTableBody: {
      styleOverrides: {
        root: {
          border: 'none',
          background: 'transparent'
        }
      }
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          background: COLORS_DARK_THEME.LIGHT_BACKGROUND,
          color: COLORS_DARK_THEME.SECONDARY_TEXT
        }
      }
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          border: 'none',
          background: 'transparent',
          backgroundColor: 'transparent'
        }
      }
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          background: COLORS_DARK_THEME.LIGHT_BACKGROUND,
          borderRadius: '30px',
          minHeight: '34px',
          height: '34px'
        },
        indicator: {
          display: 'none'
        }
      }
    },
    MuiTab: {
      styleOverrides: {
        root: {
          background: COLORS_DARK_THEME.LIGHT_BACKGROUND,
          borderRadius: '30px',
          fontSize: '12px',
          fontWeight: 600,
          minHeight: '34px',
          height: '34px',
          textTransform: 'capitalize',
          '&.Mui-selected': {
            background: COLORS_DARK_THEME.PRIMARY_BLUE,
            transition: 'background .3s ease-in-out'
          }
        }
      }
    }
  },
  custom: {
    backgrounds: {
      light: COLORS_DARK_THEME.LIGHT_BACKGROUND,
      primary: COLORS_DARK_THEME.PRIMARY_BACKGROUND,
      dark: COLORS_DARK_THEME.DARK_BACKGROUND
    },
    conditions: {
      grey: CONDITIONS.GREY,
      green: CONDITIONS.GREEN,
      yellow: CONDITIONS.YELLOW,
      red: CONDITIONS.RED
    }
  }
})

const light = createTheme({
  palette: {
    mode: 'light',
    primary: {
      light: '',
      main: '#52A6F8',
      dark: ''
    },
    background: {
      default: '#E5E5E5',
      paper: '#E5E5E5'
    }
  },
  components: {
    MuiSelect: {
      styleOverrides: {
        select: {
          padding: '0.9rem, 1.2rem',
          fontSize: '0.9rem',
          '&:before': {
            border: 'none'
          }
        }
      }
    }
  },
  typography: {
    fontFamily: ['Poppins', 'sans-serif'].join(','),
    fontSize: 16,
    htmlFontSize: 16
  },
  custom: {
    backgrounds: {
      light: '#F7F8FA',
      primary: '#FFFFFF',
      dark: '#E5E5E5'
    }
  }
})

export default {
  dark,
  light
}
