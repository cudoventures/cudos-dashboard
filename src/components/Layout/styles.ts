export const styles: SxMap = {
  menuContainer: ({ custom }) => ({
    background: custom.backgrounds.primary,
    width: 'min-content',
    minHeight: '300px',
    borderRadius: '1.3rem',
    marginBottom: '1rem',
    padding: '20px',
    position: 'sticky',
    top: 0
  }),
  userContainer: ({ custom }) => ({
    padding: '15px 20px 15px 20px',
    position: 'relative',
    background: custom.backgrounds.primary,
    borderRadius: '35px',
    height: '48px',
    display: 'flex',
    justifyContent: 'space-around',
    minWidth: '224px'
  }),
  userInnerContainer: {
    fontSize: '14px',
    fontWeight: '500',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    whiteSpace: 'nowrap'
  },
  dropdownMenuContainer: ({ custom }) => ({
    background: custom.backgrounds.light,
    fontSize: '14px',
    height: '190px',
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
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    borderRadius: '10px',
    color: palette.text.secondary,
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
    width: 'inherit',
    padding: '1rem',
    overflowWrap: 'anywhere'
  },
  networkContainer: ({ custom }) => ({
    maxHeight: '48px',
    borderRadius: '55px',
    backgroundColor: custom.backgrounds.primary,
    padding: '15px 20px 15px 20px',
    width: '224px'
  }),
  user: ({ custom }) => ({
    position: 'relative',
    maxWidth: '224px',
    maxHeight: '48px',
    borderRadius: '55px',
    background: custom.backgrounds.primary,
    zIndex: 10,
    cursor: 'pointer'
  })
}
