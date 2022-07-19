import { Box, Breadcrumbs, Button, Typography } from '@mui/material'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { updateValidatorDetails, initialState } from 'store/validatorDetails'
import { styles } from './styles'

const breadcrumbs = [
  <Typography color="text.secondary" fontWeight={800} fontSize="small" key={1}>
    Staking
  </Typography>,
  <Typography color="primary.main" fontWeight={800} fontSize="small" key={2}>
    Validator Details
  </Typography>
]

const Navigation = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleBackClick = () => {
    dispatch(updateValidatorDetails(initialState))
    navigate('/staking')
  }

  return (
    <Box sx={styles.navigationContainer}>
      <Button
        variant="contained"
        color="secondary"
        size="small"
        sx={{ width: '92px', height: '34px', fontWeight: 700 }}
        onClick={handleBackClick}
        startIcon={<ArrowBackRoundedIcon fontSize="small" />}
      >
        Back
      </Button>
      <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
        {breadcrumbs}
      </Breadcrumbs>
      <Typography fontSize={30} letterSpacing={1} fontWeight={800}>
        Validator details
      </Typography>
    </Box>
  )
}

export default Navigation
