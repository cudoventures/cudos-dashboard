import { Box, Breadcrumbs, Button, Typography } from '@mui/material'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import { useNavigate } from 'react-router-dom'
import { styles } from './styles'

const breadcrumbs = [
  <Typography color="text.secondary" fontWeight={800} fontSize="small" key={1}>
    Proposals
  </Typography>,
  <Typography color="primary.main" fontWeight={800} fontSize="small" key={2}>
    Proposal Details
  </Typography>
]

const Navigation = () => {
  const navigate = useNavigate()

  return (
    <Box sx={styles.navigationContainer}>
      <Button
        variant="contained"
        color="secondary"
        size="small"
        sx={{ width: '92px', height: '34px', fontWeight: 700 }}
        onClick={() => navigate('/proposals')}
        startIcon={<ArrowBackRoundedIcon fontSize="small" />}
      >
        Back
      </Button>
      <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
        {breadcrumbs}
      </Breadcrumbs>
      <Typography fontSize={30} letterSpacing={1} fontWeight={800}>
        Proposal details
      </Typography>
    </Box>
  )
}

export default Navigation
