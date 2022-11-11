export const headerStyles = {
  linkHolder: {
    cursor: 'pointer',
    width: 'max-content',
    marginRight: '10px',
    display: "flex",
    alignItems: "center"
  },
  logoHolder: {
    cursor: 'pointer',
    display: 'flex',
    textDecoration: 'none'
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
