/* eslint-disable import/prefer-default-export */
export const styles = {
  connectContainer: {
    display: 'grid',
    justifyContent: 'center',
    justifyItems: 'center',
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: '527px'
  },
  connectButton: {
    height: '50px',
    width: '250px',
    marginTop: '50px',
    marginBottom: '40px'
  },
  pluginWarning: {
    width: '450px',
    height: '60px',
    backgroundColor: 'rgba(82, 166, 248, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    borderRadius: '10px',
    padding: '10px'
  },
  keplrLogo: {
    marginRight: '10px'
  },
  infoIcon: {
    display: 'flex',
    marginRight: '10px'
  }
} as const
