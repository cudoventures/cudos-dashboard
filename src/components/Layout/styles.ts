export const styles: SxMap = {
  menuContainer: ({ custom }) => ({
    background: custom.backgrounds.primary,
    width: '88px',
    borderRadius: '1.3rem',
    padding: '20px',
    position: 'sticky',
    top: 0
  }),
  userContainer: ({ custom }) => ({
    padding: '15px 20px 15px 20px',
    position: 'relative',
    background: custom.backgrounds.primary,
    borderRadius: '35px',
    height: '48px'
  }),
  userInnerContainer: {
    fontSize: '14px',
    fontWeight: '500',
    display: 'flex',
    justifyContent: 'center',
    margin: '-2px'
  },
  dropdownMenuContainer: ({ custom }) => ({
    background: custom.backgrounds.light,
    fontSize: '14px',
    height: '224px',
    minWidth: '224px',
    fontWeight: '500',
    display: 'flex',
    borderRadius: '0px 0px 20px 20px',
    marginTop: '3px',
    justifyContent: 'center',
    boxShadow: '2px 10px 20px rgba(2, 6, 20, 0.6)',
    zIndex: 1
  }),
  navigationButton: ({ custom, palette }) => ({
    padding: '1rem',
    height: '3rem',
    width: '3rem',
    borderRadius: '10px',
    '&:hover': {
      backgroundColor: custom.backgrounds.light
    },
    border: 'none',
    '&.Mui-selected': {
      background: custom.backgrounds.light,
      color: palette.primary.main,
      fill: palette.primary.main,
      '&:focus': {
        backgroundColor: custom.backgrounds.light
      },
      '&:hover': {
        backgroundColor: custom.backgrounds.light
      }
    }
  }),
  footerContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    bottom: 0,
    right: 0,
    left: 0,
    width: 'inherit',
    padding: '2rem'
  },
  networkContainer: ({ custom }) => ({
    maxHeight: '48px',
    borderRadius: '55px',
    backgroundColor: custom.backgrounds.primary,
    padding: '15px 20px 15px 20px',
    marginRight: '20px'
  }),
  user: ({ custom }) => ({
    maxWidth: '224px',
    maxHeight: '48px',
    borderRadius: '55px',
    background: custom.backgrounds.primary,
    zIndex: 5,
    cursor: 'pointer'
  })
}
