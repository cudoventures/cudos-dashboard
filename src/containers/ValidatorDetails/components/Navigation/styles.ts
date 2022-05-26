export const styles: SxMap = {
  navigationContainer: ({ custom }) => ({
    background: custom.backgrounds.dark,
    display: 'flex',
    flexDirection: 'column',
    gap: 1,
    position: 'sticky',
    top: 0,
    overflow: 'hidden',
    zIndex: 1,
    paddingBottom: '0.5rem'
  })
}
