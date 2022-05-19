import { Box, Typography, Button, Avatar, Tooltip } from '@mui/material'
import Card from 'components/Card'
import TestAvatar from 'assets/vectors/test-avatar-sm.svg'
import LinkIcon from 'assets/vectors/link-icon.svg'
import { styles } from './styles'

const Proposal = () => {
  const handleExplorer = () => {
    window.open(`${import.meta.env.VITE_APP_EXPLORER_V2?.toString()}`, '_blank')
  }

  return (
    <Card sx={styles.cardContainer}>
      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex' }}>
            <Typography color="text.secondary" sx={styles.cardEnumeration}>
              #1
            </Typography>
            <Typography sx={styles.cardTitle}>
              Add the ability to query a Desmos profile by chain link and
              application link
            </Typography>
          </Box>
          <Box>
            <Button sx={styles.cardActionButton}>Deposit</Button>
          </Box>
        </Box>
        <Box color="text.secondary" sx={styles.proposalContent}>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut
            proin nulla auctor ut augue tempor. Eget venenatis netus nam in
            scelerisque. Amet, dictum varius lectus rhoncus molestie sed.
            Feugiat nisi, elementum.
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', width: '100%' }}>
          <Box
            sx={{
              display: 'flex',
              marginLeft: '40px',
              marginTop: '30px',
              width: '50%'
            }}
          >
            <Box sx={{ flex: '1' }}>
              <Typography
                sx={{
                  fontSize: '14px'
                }}
              >
                Proposer
              </Typography>
              <Box>
                <Typography color="primary.main" sx={styles.proposerAddress}>
                  <Avatar
                    sx={styles.avatarStyle}
                    src={TestAvatar}
                    alt="Avatar"
                  />
                  cudosabvg...3649
                  <Tooltip
                    onClick={() => handleExplorer()}
                    title="Go to Explorer"
                  >
                    <img
                      style={{ marginLeft: '10px', cursor: 'pointer' }}
                      src={LinkIcon}
                      alt="Link"
                    />
                  </Tooltip>
                </Typography>
              </Box>
            </Box>
            <Box sx={{ flex: '1' }}>
              <Typography
                sx={{
                  fontSize: '14px'
                }}
              >
                Submit Time
              </Typography>
              <Typography color="text.secondary" sx={styles.timeStyle}>
                28 Oct 2021, 16:45 PM (UTC +2)
              </Typography>
            </Box>
            <Box>
              <Typography
                sx={{
                  fontSize: '14px'
                }}
              >
                Status
              </Typography>
              <Typography sx={styles.statusBox}>Deposit</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Card>
  )
}

export default Proposal
