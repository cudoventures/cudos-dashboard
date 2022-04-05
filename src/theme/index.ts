import { createTheme } from '@mui/material/styles'
import { blue } from '@mui/material/colors'

const dark = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      light: '',
      main: '#52A6F8',
      dark: ''
    },
    background: {
      default: '#1C2030',
      paper: '#1C2030'
    },
    text: {
      primary: '#F6F9FE',
      secondary: '#7D87AA'
    }
  },
  typography: {
    fontFamily: ['Poppins', 'sans-serif'].join(','),
    htmlFontSize: 16
  },
  components: {
    MuiSelect: {
      styleOverrides: {
        select: {
          padding: '14px, 20px',
          fontSize: '14px',
          '&:before': {
            border: 'none'
          }
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        sizeMedium: {
          borderRadius: '26px',
          background: '#52A6F8',
          color: 'white',
          padding: '10px 20px 10px 20px',
          textTransform: 'none'
        }
      }
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundImage: 'url(src/assets/background.svg)'
        }
      }
    }
  },
  backgrounds: {
    light: '#28314E',
    primary: '#20273E',
    dark: '#1C2030'
  }
})

const light = createTheme({
  palette: {
    mode: 'light',
    primary: {
      light: '',
      main: blue[500],
      dark: ''
    },
    background: {
      default: '#1C2030',
      paper: '#1C2030'
    }
  },
  typography: {
    fontFamily: ['Poppins', 'sans-serif'].join(','),
    htmlFontSize: 16
  }
})

export default {
  dark,
  light
}
