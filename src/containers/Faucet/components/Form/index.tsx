import { useState } from 'react'
import { Box, Button, Stack, Typography } from '@mui/material'
import Card from 'components/Card'
import { StyledTextField } from 'components/Dialog/components/styles'
import { styles } from './styles'

const Form = () => {
  const [address, setAddress] = useState<string>('')
  const [amount, setAmount] = useState<string>('')

  const handleAddress = (
    ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setAddress(ev.target.value)
  }

  const handleAmount = (
    ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setAmount(ev.target.value)
  }

  return (
    <Card sx={{ padding: 0, flex: 1 }}>
      <Box sx={styles.formContainer}>
        <Typography variant="h5" fontWeight={900}>
          Receive 10 Testnet CUDOS tokens
        </Typography>
        <Stack sx={{ width: '100%' }}>
          <Typography variant="body2" fontWeight={700}>
            Wallet address
          </Typography>
          <StyledTextField
            variant="standard"
            margin="dense"
            placeholder="e.g. cudos1yjwqaka8epq29urj8hrchrfjqwgmvevj0fjkpw"
            fullWidth
            value={address}
            InputProps={{
              disableUnderline: true,
              inputProps: {
                style: {
                  padding: 0
                }
              }
            }}
            onChange={handleAddress}
            sx={({ custom }) => ({
              background: custom.backgrounds.light,
              padding: '16px'
            })}
          />
        </Stack>
        <Stack sx={{ width: '100%' }}>
          <Typography variant="body2" fontWeight={700}>
            Amount (Maximum 10 CUDOS)
          </Typography>
          <StyledTextField
            variant="standard"
            margin="dense"
            fullWidth
            value={amount}
            InputProps={{
              disableUnderline: true,
              inputProps: {
                style: {
                  padding: 0
                }
              }
            }}
            onChange={handleAmount}
            sx={({ custom }) => ({
              background: custom.backgrounds.light,
              padding: '16px'
            })}
          />
        </Stack>
        <Button
          variant="contained"
          color="primary"
          sx={() => ({
            width: '50%'
          })}
          onClick={() => {}}
          disabled={Number(amount) > 10 || !amount || Number(amount) <= 0}
        >
          Recieve Tokens
        </Button>
      </Box>
    </Card>
  )
}

export default Form
