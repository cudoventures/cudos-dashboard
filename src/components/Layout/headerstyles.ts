import { COLORS_DARK_THEME } from "theme/colors";

export const headerStyles = {
  linkHolder: {
    cursor: 'pointer',
    width: 'max-content',
    display: "flex",
    alignItems: "center",
    '&:hover': {
      color: COLORS_DARK_THEME.PRIMARY_BLUE
    }
  },
  logoHolder: {
    cursor: 'pointer',
    display: 'flex',
    textDecoration: 'none'
  },
  divider: {
    height: '20px',
    background: '#7D87AA'
  },
  headerContainer: {
    padding: '2rem',
    justifyContent: 'space-between',
    alignItems: 'center',
    display: 'flex',
    flex: '1'
  },
  smallerScreenHeaderContainer: {
    padding: '2rem',
    justifyContent: 'space-between',
    flexDirection: 'column',
    alignItems: 'center',
    display: 'flex',
    flex: '1'
  },
} as const
