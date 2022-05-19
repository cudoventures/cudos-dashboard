import { styled, Input } from '@mui/material'
import theme from 'theme/index'
/* eslint-disable import/prefer-default-export */

export const InputContainer = styled(Input)(() => ({
  minWidth: '25vw',
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

export const styles = {
  headerStyle: {
    fontSize: '30px',
    fontWeight: '700'
  },
  stickyHeader: {
    position: 'fixed',
    background: theme.dark.custom.backgrounds.dark,
    width: '100%',
    zIndex: '5'
  },
  subheaderStyle: {
    fontWeight: '600',
    letterSpacing: '2px',
    fontSize: '14px',
    marginBottom: '5px'
  },
  cardContainer: {
    width: '100%',
    minHeight: '213px',
    background: theme.dark.custom.backgrounds.light,
    marginBottom: '20px',
    boxShadow: 'none'
  },
  cardEnumeration: {
    marginTop: '4px',
    fontWeight: '600',
    fontSize: '14px'
  },
  cardTitle: {
    fontWeight: '600',
    fontSize: '18px',
    marginLeft: '20px'
  },
  cardActionButton: {
    width: '163px',
    height: '50px',
    zIndex: '1'
  },
  proposalContent: {
    display: 'flex',
    marginLeft: '40px',
    marginTop: '10px',
    width: '50%',
    fontWeight: '400'
  },
  statusBox: {
    marginTop: '5px',
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
  tableContainer: {
    width: '100%',
    height: '100%',
    padding: '0rem 1.2rem 1.2rem 1.2rem',
    marginTop: '90px',
    overflow: 'scroll'
  },
  tableHeader: {
    display: 'flex',
    background: '#20273E',
    paddingTop: '1.2rem',
    paddingBottom: '1.2rem',
    position: 'sticky',
    top: '0',
    zIndex: '4'
  },
  chipStyle: {
    borderRadius: '10px',
    color: 'white',
    fontWeight: 600,
    marginLeft: '10px'
  },
  createProposalBtnContainer: {
    position: 'absolute',
    right: '0'
  },
  crateProposalBtn: {
    height: '50px',
    width: '199px',
    background: '#2A4064',
    color: '#52A6F8'
  }
} as const
