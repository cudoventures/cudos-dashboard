import { styled, Input } from '@mui/material'
import { COLORS_DARK_THEME } from 'theme/colors'

export const InputContainer = styled(Input)(() => ({
  background: '#28314E',
  padding: '10px 20px 10px 20px',
  borderRadius: '5px',
  '&:before': {
    border: 'none'
  },
  '&:after': {
    border: 'none'
  }
}))

export const styles: SxMap = {
  logoHolder: {
    gap: '10px',
    display: 'flex',
    alignItems: 'center',
    height: '96px'
  },
  contentBox: {
    marginBottom: '20px',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center'
  },
  cardContainer: {
    background: COLORS_DARK_THEME.LIGHT_BACKGROUND,
    borderRadius: '15px',
    width: '280px',
    height: '288px',
    flex: 1,
    overflow: 'scroll',
    padding: '15px 20px 10px 20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center'
  },

  dappsGrid: {
    justifyContent: "flex-start",
    maxWidth: "1920px",
    alignSelf: "center",
    width: "100%",
  },


  headerStyle: {
    fontSize: '30px',
    fontWeight: '700'
  },
  stickyHeader: ({ custom }) => ({
    position: 'sticky',
    top: 0,
    background: custom.backgrounds.dark,
    width: '100%',
    zIndex: '5'
  }),

  subheaderStyle: {
    fontWeight: '600',
    letterSpacing: '2px',
    fontSize: '14px',
    marginBottom: '5px'
  },
  cardEnumeration: {
    fontWeight: '600',
    fontSize: '16px'
  },
  cardTitle: {
    fontWeight: '600',
    fontSize: '18px',
    marginLeft: '50px'
  },
  cardActionButton: {
    width: '163px',
    height: '50px',
    zIndex: '1'
  },
  proposalContent: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: '50px',
    marginTop: '10px',
    width: '50%',
    fontWeight: '400'
  },
  votingSectionContent: {
    display: 'flex',
    marginLeft: '50px',
    width: '50%',
    fontWeight: '400'
  },
  statusBox: ({ palette }) => ({
    marginTop: '5px',
    borderRadius: '10px',
    background: palette.primary.main,
    color: 'white',
    padding: '6px 17px 6px 17px',
    fontSize: '12px',
    fontWeight: '600',
    letterSpacing: '2px',
    maxWidth: '255px',
    overflowWrap: 'anywhere'
  }),
  proposerAddress: {
    marginTop: '10px',
    display: 'flex',
    alignItems: 'center',
    fontSize: '14px'
  },
  timeStyle: {
    marginTop: '10px',
    fontWeight: '500',
    fontSize: '14px'
  },
  avatarStyle: {
    width: '20px',
    height: '20px',
    marginRight: '7px'
  },

  tableHeader: ({ custom }) => ({
    display: 'flex',
    background: custom.backgrounds.primary,
    paddingTop: '1.2rem',
    paddingBottom: '1.2rem',
    position: 'sticky',
    top: '0',
    zIndex: '4'
  }),
  chipStyle: {
    borderRadius: '10px',
    color: 'white',
    fontWeight: 600,
    marginLeft: '10px'
  },
  createProposalBtnContainer: {
    marginLeft: 'auto'
  },
  crateProposalBtn: () => ({
    height: '50px',
    width: '199px',
    boxShadow: 'none',
    fontWeight: '600'
  }),
  votingOptions: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '12px'
  },
  circularProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  },
  noSearchResults: {
    position: 'absolute',
    top: '25vh',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  }
} as const
