import { Typography } from '@mui/material'

import { styles } from './styles'

export const proposalStatus = (status: string) => {
  switch (status) {
    case 'PROPOSAL_STATUS_UNSPECIFIED':
      return (
        <Typography sx={{ backgroundColor: '#ff5722' }}>Unspecified</Typography>
      )

    case 'PROPOSAL_STATUS_DEPOSIT_PERIOD':
      return (
        <Typography sx={styles.statusBox} style={{ background: '#52A6F8' }}>
          DEPOSIT
        </Typography>
      )

    case 'PROPOSAL_STATUS_VOTING_PERIOD':
      return (
        <Typography sx={styles.statusBox} style={{ background: '#9646F9' }}>
          VOTING
        </Typography>
      )

    case 'PROPOSAL_STATUS_PASSED':
      return (
        <Typography sx={styles.statusBox} style={{ background: '#65B48F' }}>
          PASSED
        </Typography>
      )

    case 'PROPOSAL_STATUS_REJECTED':
      return (
        <Typography sx={styles.statusBox} style={{ background: '#ff5722' }}>
          REJECTED
        </Typography>
      )

    case 'PROPOSAL_STATUS_FAILED':
      return (
        <Typography sx={styles.statusBox} style={{ background: '#ff5722' }}>
          FAILED
        </Typography>
      )

    case 'PROPOSAL_STATUS_INVALID':
      return (
        <Typography sx={styles.statusBox} style={{ background: 'black' }}>
          REMOVED
        </Typography>
      )

    case 'UNRECOGNIZED':
      return (
        <Typography sx={styles.statusBox} style={{ background: '#ff5722' }}>
          UNRECOGNIZED
        </Typography>
      )

    default:
      return (
        <Typography sx={styles.statusBox} style={{ background: '#ff5722' }}>
          UNRECOGNIZED
        </Typography>
      )
  }
}
