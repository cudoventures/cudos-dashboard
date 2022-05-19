import { Box, InputAdornment, Typography, Chip, Button } from '@mui/material'
import Card from 'components/Card/Card'
import SearchIcon from 'assets/vectors/search-icon.svg'

import { InputContainer, styles } from './styles'
import Proposal from './Proposal'

const Proposals = () => {
  return (
    <>
      <Box style={styles.stickyHeader}>
        <Typography style={styles.headerStyle}>Proposals</Typography>
        <Typography
          style={styles.subheaderStyle}
          variant="subtitle1"
          color="text.secondary"
        >
          Here you can see the existing proposals’ statuses or create new one
        </Typography>
      </Box>
      <Card style={styles.tableContainer}>
        <Box style={styles.tableHeader}>
          <Typography
            color="text.secondary"
            sx={{ marginTop: '5px' }}
            style={styles.subheaderStyle}
          >
            PROPOSALS
          </Typography>
          <Chip label={23} color="primary" sx={styles.chipStyle} />
          <Box>
            <InputContainer
              style={{ marginLeft: '50px' }}
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
          <Box style={styles.createProposalBtnContainer}>
            <Button style={styles.crateProposalBtn}>Create Proposal</Button>
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
