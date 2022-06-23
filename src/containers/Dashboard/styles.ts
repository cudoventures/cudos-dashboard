import theme from 'theme'

export const styles: SxMap = {
  headerStyle: {
    fontSize: '30px',
    fontWeight: '700'
  },
  stickyHeader: {
    position: 'fixed',
    background: theme.dark.custom.backgrounds.dark,
    width: '100%',
    zIndex: '1'
  },
  subheaderStyle: {
    fontWeight: '600',
    letterSpacing: '2px',
    fontSize: '14px'
  },
  networkCardTitleStyle: {
    fontWeight: '600',
    fontSize: '14px',
    marginBottom: '10px',
    display: 'flex',
    alignItems: 'center'
  },
  avatarStyle: {
    width: '120px',
    height: '120px',
    marginTop: '20px'
  },
  networkCardContentStyle: {
    fontSize: '20px',
    fontWeight: '600',
    letterSpacing: '2px'
  },
  networkCardFooterStyle: {
    fontSize: '12px',
    fontWeight: '500'
  },
  latestActivityCard: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    height: '100%',
    overflow: 'auto',
    position: 'relative'
  },
  networkStatisticsCard: {
    flex: 3,
    minHeight: '700px',
    height: '100%'
  },
  networkCardStyle: {
    height: '101px',
    borderRadius: '12px',
    backgroundColor: theme.dark.custom.backgrounds.light,
    padding: '15px 20px 15px 20px',
    marginBottom: '20px'
  },
  networkInfoContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    borderRadius: '5px',
    padding: '17px',
    background: theme.dark.custom.backgrounds.light,
    alignItems: 'baseline'
  },
  noActivityStyle: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    fontSize: '20px',
    fontWeight: '600'
  },
  walletInfo: {
    flex: 4,
    display: 'flex',
    flexDirection: 'column',
    gap: 1,
    boxShadow: ' 2px 2px 30px 10px rgba(82, 166, 248, 0.05)',
    borderRadius: '30px',
    padding: '20px'
  },
  addressContainer: ({ palette }) => ({
    borderRadius: '35px',
    border: `1px solid ${palette.primary.main}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
    padding: '1rem 2rem',
    overflow: 'hidden'
  }),
  tokensContainer: {
    display: 'grid',
    gridTemplateColumns: '46px 1fr',
    gridTemplateRows: '46px 25px',
    gridColumnGap: '9px',
    gridRowGap: '0px'
  },
  stakingContainer: {
    flex: 8,
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    borderRadius: '30px'
  },
  stakedTokens: ({ palette }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: 1,
    borderLeft: `2px solid ${palette.primary.main}`,
    padding: '5px 1rem'
  }),
  availableRewards: ({ palette }) => ({
    display: 'flex',
    borderLeft: `2px solid ${palette.primary.main}`,
    alignItems: 'center',
    gap: 4
  }),
  dashboardContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    height: '100%'
  },
  dashboardHeaderContainer: ({ custom }) => ({
    background: custom.backgrounds.dark,
    display: 'flex',
    flexDirection: 'column',
    position: 'sticky',
    top: 0,
    zIndex: 4
  }),
  dashboardContentContainer: {
    display: 'flex',
    gap: 2,
    minHeight: '700px',
    height: '100%'
  },
  dashboardLeftContent: {
    flex: 9,
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    height: '100%'
  }
} as const
