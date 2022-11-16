import { useState, useRef } from 'react'
import { Box, Button, Stack, Typography } from '@mui/material'
import ReCaptcha from 'react-google-recaptcha'
import Card from 'components/Card'
import { StyledTextField } from 'components/Dialog/components/styles'
import BigNumber from 'bignumber.js'
import { useNotifications } from 'components/NotificationPopup/hooks'
import getFaucetTokens from 'api/getFaucetTokens'
import CosmosNetworkConfig from 'ledgers/CosmosNetworkConfig'
import { ModalStatus } from 'store/modal'
import { isValidCudosAddress } from 'utils/projectUtils'
import useModal from '../FaucetModal/hooks'
import { styles } from './styles'
import { CHAIN_DETAILS } from 'utils/constants'
import { useSelector } from 'react-redux'
import { RootState } from 'store'

const Form = () => {
  const captchaRef = useRef<any>(null)
  const [address, setAddress] = useState<string>('')
  const [amount, setAmount] = useState<string>('')
  const [validatedCaptcha, setValidatedCaptcha] = useState<boolean>(false)
  const { setWarning } = useNotifications()
  const { chosenNetwork } = useSelector((state: RootState) => state.profile)
  const maxAmountAllowed: number = 100

  const { handleModal } = useModal()

  const validData = () => {
    if (
      !validatedCaptcha ||
      Number(amount) > maxAmountAllowed ||
      Number(amount) <= 0 ||
      !amount ||
      !address
    ) {
      return false
    }

    return true
  }

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

  const checkCaptcha = async () => {
    const token = captchaRef.current.getValue()

    if (token) {
      setValidatedCaptcha(true)
      return
    }

    setValidatedCaptcha(false)
  }

  const handleReceiveTokens = async () => {
    const token = captchaRef.current.getValue()

    const transferAmount = new BigNumber(amount)
      .multipliedBy(CosmosNetworkConfig.CURRENCY_1_CUDO)
      .toString(10)

    if (!isValidCudosAddress(address)) {
      setWarning('Wrong CUDOS Address Format')
      return
    }

    const data = {
      address,
      coins: [`${transferAmount}${CosmosNetworkConfig.CURRENCY_DENOM}`],
      captchaResponse: token
    }

    try {
      handleModal({ open: true, status: ModalStatus.LOADING })

      const response = await getFaucetTokens(
        CHAIN_DETAILS.FAUCET_ADDRESS[chosenNetwork as keyof typeof CHAIN_DETAILS.FAUCET_ADDRESS],
        data
      )

      if (response.data.transfers[0].status === 'error') {
        handleModal({
          open: true,
          status: ModalStatus.FAILURE,
          failureMessage: {
            title: 'Transaction failed!',
            subtitle: 'Maximum amount of 100 CUDOS reached for this account.'
          }
        })
      } else {
        handleModal({ open: true, status: ModalStatus.SUCCESS })
      }

      captchaRef.current.reset()
      setAmount('')
    } catch (error) {
      handleModal({
        open: true,
        status: ModalStatus.FAILURE,
        failureMessage: {
          title: 'Transaction failed!',
          subtitle: 'Seems like something went wrong with the transaction.'
        }
      })
      captchaRef.current.reset()
    }
  }

  return (
    <Card sx={{ padding: 0, flex: 1, height: '100%' }}>
      <Box sx={styles.formContainer}>
        <Typography variant="h5" fontWeight={900}>
          Receive Testnet CUDOS tokens
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
            Amount (Maximum 100 CUDOS)
          </Typography>
          <StyledTextField
            variant="standard"
            margin="dense"
            fullWidth
            type="number"
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
          <Stack sx={{ width: '100%', marginTop: '20px' }}>
            <ReCaptcha
              style={{
                display: 'flex',
                justifyContent: 'center',
                flex: 1
              }}
              theme="dark"
              ref={captchaRef}
              onChange={checkCaptcha}
              sitekey={CHAIN_DETAILS.CAPTCHA_SITE_KEY[chosenNetwork as keyof typeof CHAIN_DETAILS.CAPTCHA_SITE_KEY]}
            />
          </Stack>
        </Stack>
        <Button
          variant="contained"
          color="primary"
          sx={() => ({
            width: '50%'
          })}
          onClick={handleReceiveTokens}
          disabled={!validData()}
        >
          Receive Tokens
        </Button>
      </Box>
    </Card>
  )
}

export default Form
