import BackgroundImage from 'assets/background.svg'

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
    maxWidth: '600px'
  },
  subHeaderContainer: {
    display: 'flex',
    textAlign: 'center',
    marginBottom: '25px'
  },
  connectButton: {
    height: '50px',
    width: '290px',
    marginBottom: '25px'
  },
  cosmostationConnectBtn: {
    height: '50px',
    width: '290px',
    marginBottom: '40px'
  },
  pluginWarning: {
    maxWidth: '600px',
    fontSize: '14px',
    height: '60px',
    backgroundColor: 'rgba(82, 166, 248, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    borderRadius: '10px',
    padding: '10px 20px 10px 20px'
  },
  keplrLogo: {
    marginRight: '10px'
  },
  cosmostationLogo: {
    marginRight: '10px',
    width: '30px',
    height: '30px'
  },
  infoIcon: {
    display: 'flex',
    marginRight: '10px'
  },
  backgroundStyle: {
    width: '100vw',
    height: '100vh',
    backgroundImage: `url('${BackgroundImage}')`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat'
  }
} as const
