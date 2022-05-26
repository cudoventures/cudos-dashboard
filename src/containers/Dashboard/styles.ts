export const styles: SxMap = {
  headerStyle: {
    fontSize: '30px',
    fontWeight: '700'
  },
  stickyHeader: ({ custom }) => ({
    position: 'fixed',
    background: custom.backgrounds.dark,
    width: '100%',
    zIndex: '1'
  }),
  subheaderStyle: {
    fontWeight: '600',
    letterSpacing: '2px',
    fontSize: '14px',
    marginBottom: '5px'
  },
  networkCardTitleStyle: {
    fontWeight: '600',
    fontSize: '14px',
    marginBottom: '10px',
    display: 'flex',
    alignItems: 'center'
  },
  editButtonStyle: {
    fontSize: '14px',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer'
  },
  claimButtonStyle: {
    width: '80px',
    height: '34px',
    fontSize: '12px',
    fontWeight: '600'
  },
  avatarStyle: {
    width: '120px',
    height: '120px',
    marginTop: '20px'
  },
  usernameStyle: {
    fontSize: '20px',
    fontWeight: '700',
    marginBottom: '10px',
    letterSpacing: '2px'
  },
  networkBoxStyle: ({ custom }) => ({
    display: 'flex',
    borderRadius: '5px',
    padding: '17px',
    background: custom.backgrounds.light,
    alignItems: 'baseline'
  }),
  networkCardContentStyle: {
    fontSize: '20px',
    fontWeight: '600',
    letterSpacing: '2px'
  },
  balanceCardContentStyle: {
    fontSize: '20px',
    fontWeight: '600',
    letterSpacing: '2px'
  },
  networkCardFooterStyle: {
    fontSize: '12px',
    fontWeight: '500'
  },
  walletInfoContainer: {
    display: 'flex',
    position: 'relative',
    alignItems: 'center'
  },
  walletInfoCard: {
    minHeight: '319px',
    width: '438px'
  },
  walletBalanceCard: {
    minHeight: '319px',
    width: '438px'
  },
  editButton: {
    position: 'absolute',
    right: '20px'
  },
  latestActivityCard: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '347px',
    maxHeight: '500px',
    maxWidth: '897px',
    overflow: 'hidden',
    position: 'relative'
  },
  networkStatisticsCard: {
    minHeight: '100%',
    width: '320px'
  },
  networkCardStyle: ({ custom }) => ({
    height: '101px',
    borderRadius: '12px',
    backgroundColor: custom.backgrounds.light,
    padding: '15px 20px 15px 20px',
    marginBottom: '20px'
  }),
  networkInfoContainer: ({ custom }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    borderRadius: '5px',
    padding: '17px',
    background: custom.backgrounds.light,
    alignItems: 'baseline'
  }),
  networkInfo: {
    fontSize: '14px',
    fontWeight: '600',
    marginLeft: '20px'
  },
  connectionStatus: {
    fontSize: '14px',
    fontWeight: '600',
    marginLeft: '90px',
    display: 'flex',
    alignItems: 'center'
  },
  amountDollarStyle: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '16px',
    fontWeight: '600',
    marginLeft: '5px'
  },
  latestActivityAction: {
    borderRadius: '10px',
    background: '#52A6F8',
    color: 'white',
    padding: '6px 17px 6px 17px',
    fontSize: '12px',
    fontWeight: '600',
    letterSpacing: '2px',
    maxWidth: '255px',
    overflowWrap: 'anywhere'
  },
  noActivityStyle: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    fontSize: '20px',
    fontWeight: '600'
  }
}
