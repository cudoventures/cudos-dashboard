import { Box, InputAdornment, Typography, Chip, Button } from '@mui/material'
import Card from 'components/Card'
import SearchIcon from 'assets/vectors/search-icon.svg'

import { InputContainer, styles } from './styles'
import Proposal from './Proposal'

const Proposals = () => {
  return (
    <>
      <Box sx={styles.stickyHeader}>
        <Typography sx={styles.headerStyle}>Proposals</Typography>
        <Typography
          sx={styles.subheaderStyle}
          variant="subtitle1"
          color="text.secondary"
        >
          Here you can see the existing proposals’ statuses or create new one
        </Typography>
      </Box>
      <Card sx={styles.tableContainer}>
        <Box sx={styles.tableHeader}>
          <Typography
            color="text.secondary"
            sx={{ ...styles.subheaderStyle, marginTop: '5px' }}
          >
            PROPOSALS
          </Typography>
          <Chip label={23} color="primary" sx={styles.chipStyle} />
          <Box>
            <InputContainer
              sx={{ marginLeft: '50px' }}
              disableUnderline
              placeholder="Search for proposal, proposer, ID..."
              startAdornment={
                <InputAdornment position="start">
                  <img
                    style={{ marginRight: '20px' }}
                    src={SearchIcon}
                    alt="Search"
                  />
                </InputAdornment>
              }
            />
          </Box>
          <Box sx={styles.createProposalBtnContainer}>
            <Button sx={styles.crateProposalBtn}>Create Proposal</Button>
          </Box>
        </Box>
        <Box>
          <Proposal />
          <Proposal />
          <Proposal />
          <Proposal />
          <Proposal />
          <Proposal />
          <Proposal />
          <Proposal />
          <Proposal />
          <Proposal />
          <Proposal />
          <Proposal />
          <Proposal />
          <Proposal />
        </Box>
      </Card>
    </>
  )
}

export default Proposals
