import theme from '../../theme/index'

/* eslint-disable import/prefer-default-export */
export const styles = {
  headerStyle: {
    fontSize: '30px',
    fontWeight: '700'
  },
  subheaderStyle: {
    fontWeight: '600',
    letterSpacing: '2px',
    fontSize: '14px'
  },
  networkCardTitleStyle: {
    fontWeight: '600',
    fontSize: '14px',
    marginBottom: '5px'
  },
  editButtonStyle: {
    fontSize: '14px',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center'
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
  networkBoxStyle: {
    display: 'flex',
    borderRadius: '5px',
    padding: '17px',
    background: theme.dark.backgrounds.light,
    alignItems: 'baseline'
  },
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
    minWidth: '438px',
    marginRight: '20px'
  },
  editButton: {
    position: 'absolute',
    right: '20px'
  },
  latestActivityCard: {
    minHeight: '347px',
    marginTop: '20px',
    maxWidth: '896px'
  },
  networkStatisticsCard: {
    minHeight: '687px',
    minWidth: '325px'
  },
  networkCardStyle: {
    height: '101px',
    borderRadius: '12px',
    backgroundColor: theme.dark.backgrounds.light,
    padding: '15px 20px 15px 20px',
    marginBottom: '20px'
  },
  networkInfoContainer: {
    display: 'flex',
    borderRadius: '5px',
    padding: '17px',
    background: theme.dark.backgrounds.light,
    alignItems: 'baseline'
  },
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
    fontWeight: '600'
  }
} as const
