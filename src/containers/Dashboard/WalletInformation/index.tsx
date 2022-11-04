import { useEffect, useState } from 'react'
import {
  Box,
  Button,
  Grid,
  Stack,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material'
import Card from 'components/Card'
import { useDispatch } from 'react-redux'
import getCurrencyRate from 'api/getCurrency'
import { TransactionCurrency, updateUser } from 'store/profile'
import {
  copyToClipboard,
  formatAddress,
  getStakedBalance,
  getWalletBalance
} from 'utils/projectUtils'
import CopyIcon from 'assets/vectors/copy-icon.svg'
import LinkIcon from 'assets/vectors/link-icon.svg'
import CudosLogo from 'assets/vectors/cudos-logo.svg?component'
import { formatNumber } from 'utils/format_token'
import BigNumber from 'bignumber.js'
import { fetchRewards } from 'api/getRewards'
import { useNotifications } from 'components/NotificationPopup/hooks'
import { ModalStatus } from 'store/modal'
import { getUnbondingBalance } from 'api/getUnbondingBalance'
import useValidators from 'containers/Staking/components/Validators/components/Table/hooks'
import { styles } from '../styles'
import ClaimRewardsModal from './components/ClaimRewardsModal'
import { useDelegationRewards } from './hooks'
import useRewardsModal from './components/ClaimRewardsModal/hooks'
import useUnbondingModal from './components/UnbondingTokensModal/hooks'
import UnbondingModal from './components/UnbondingTokensModal'

const WalletInformation: React.FC = () => {
  const [rate, setRate] = useState<number>(0)
  const [copied, setCopied] = useState<boolean>(false)
  const { state } = useDelegationRewards()
  const { handleModal: handleRewardsModal } = useRewardsModal()
  const { handleModal: handleunbondingModal } = useUnbondingModal()
  const {
    balance,
    availableRewards,
    stakedBalance,
    unbondingBalance,
    address,
    stakedValidators,
    lastLoggedAddress
  } = state
  const dispatch = useDispatch()
  const { setError } = useNotifications()
  const { state: validatorState } = useValidators()

  useEffect(() => {
    const getCurrencies = async () => {
      const response = await getCurrencyRate(TransactionCurrency.USD)

      setRate(response.data.cudos[TransactionCurrency.USD])
    }

    getCurrencies()
  }, [address])

  const handleCopy = (value: string) => {
    copyToClipboard(value)
    setCopied(true)

    setTimeout(() => {
      setCopied(false)
    }, 3000)
  }

  useEffect(() => {
    const controller = new AbortController()
    const fetchData = async () => {
      try {
        const { totalRewards, validatorArray } = await fetchRewards(
          address,
          controller.signal
        )
        const walletBalance = await getWalletBalance(address)
        const stakedAmountBalance = await getStakedBalance(address)
        const { unbondingBalance } = await getUnbondingBalance(address)

        dispatch(
          updateUser({
            address,
            balance: new BigNumber(walletBalance),
            availableRewards: new BigNumber(totalRewards),
            stakedValidators: validatorArray,
            stakedBalance: new BigNumber(stakedAmountBalance),
            unbondingBalance: new BigNumber(unbondingBalance)
          })
        )
      } catch (error: any) {
        setError(error.message)
      }
    }
    const timer = setInterval(async () => {
      await fetchData()
    }, 15000)

    return () => {
      clearInterval(timer)
      controller?.abort()
    }
  }, [address, dispatch, lastLoggedAddress])

  return (
    <Card
      sx={{
        width: '100%',
        display: 'flex',
        gap: 8
      }}
    >
      <Grid container>
        <Box sx={styles.walletInfo}>
          <Typography
            color="text.secondary"
            textTransform="uppercase"
            fontWeight={700}
            letterSpacing={1}
          >
            Available tokens
          </Typography>
          <Box sx={styles.tokensContainer}>
            <CudosLogo style={{ width: '46px', height: 'auto' }} />
            <Box>
              <Typography fontSize={30} fontWeight={700}>
                {formatNumber(Number(balance).toFixed(2), 2)}
              </Typography>
              <Typography color="primary.main" fontWeight={700}>
                ${formatNumber((rate * Number(balance)).toFixed(2), 2)}
              </Typography>
            </Box>
          </Box>
          <Box sx={styles.addressContainer}>
            <Typography variant="body1">
              {formatAddress(address, 20)}
            </Typography>
            <Tooltip
              onClick={() => handleCopy(address)}
              title={copied ? 'Copied' : 'Copy to clipboard'}
            >
              <img style={{ cursor: 'pointer' }} src={CopyIcon} alt="Copy" />
            </Tooltip>
            <Tooltip
              title="Go to Explorer"
              onClick={() =>
                window
                  .open(
                    `${
                      import.meta.env.VITE_APP_EXPLORER_V2
                    }/accounts/${address}`,
                    '_blank'
                  )
                  ?.focus()
              }
            >
              <img style={{ cursor: 'pointer' }} src={LinkIcon} alt="Link" />
            </Tooltip>
          </Box>
        </Box>
        <Box marginLeft="35px" sx={styles.stakingContainer}>
          <Typography
            sx={{ marginTop: '10px' }}
            variant="h6"
            fontWeight={700}
            letterSpacing={1}
          >
            My Wallet
          </Typography>
          <Box sx={styles.stakedTokens}>
            <Typography
              textTransform="uppercase"
              fontWeight={700}
              color="text.secondary"
            >
              Staked cudos
            </Typography>
            <Stack
              sx={{ flexFlow: 'wrap' }}
              direction="row"
              alignItems="center"
              gap="6px"
            >
              <CudosLogo style={{ width: '20px', height: 'auto' }} />
              <Typography variant="h5" fontWeight={700}>
                {formatNumber(Number(stakedBalance).toFixed(2), 2)}
              </Typography>
              <Typography variant="h6" color="primary.main" fontWeight={700}>
                ${formatNumber((rate * Number(stakedBalance)).toFixed(2), 2)}
              </Typography>
            </Stack>
          </Box>
          {Number(unbondingBalance) !== 0 ? (
            <Box sx={styles.availableRewards}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1,
                  padding: '5px 1rem'
                }}
              >
                <Typography
                  textTransform="uppercase"
                  fontWeight={700}
                  color="text.secondary"
                >
                  Unbonding cudos
                </Typography>
                <Stack
                  direction="row"
                  alignItems="center"
                  gap="6px"
                  sx={{ flexFlow: 'wrap' }}
                >
                  <CudosLogo style={{ width: '20px', height: 'auto' }} />
                  <Typography variant="h5" fontWeight={700}>
                    {formatNumber(Number(unbondingBalance).toFixed(2), 2)}
                  </Typography>
                  <Typography
                    variant="h6"
                    color="primary.main"
                    fontWeight={700}
                  >
                    $
                    {formatNumber(
                      (rate * Number(unbondingBalance)).toFixed(2),
                      2
                    )}
                  </Typography>
                </Stack>
              </Box>
              <Box>
                <Button
                  onClick={() =>
                    handleunbondingModal({
                      open: true
                    })
                  }
                  sx={{ fontWeight: 700, minWidth: '150px' }}
                  disabled={!stakedValidators.length}
                  variant="contained"
                  color="primary"
                >
                  View Details
                </Button>
              </Box>
            </Box>
          ) : null}
          <Box sx={styles.availableRewards}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
                padding: '5px 1rem'
              }}
            >
              <Typography
                textTransform="uppercase"
                fontWeight={700}
                color="text.secondary"
              >
                Available rewards
              </Typography>
              <Stack
                sx={{ flexFlow: 'wrap' }}
                direction="row"
                alignItems="center"
                gap="6px"
              >
                <CudosLogo style={{ width: '20px', height: 'auto' }} />
                <Typography variant="h5" fontWeight={700}>
                  {formatNumber(Number(availableRewards).toFixed(2), 2)}
                </Typography>
                <Typography variant="h6" color="primary.main" fontWeight={700}>
                  $
                  {formatNumber(
                    (rate * Number(state.availableRewards)).toFixed(2),
                    2
                  )}
                </Typography>
              </Stack>
            </Box>
            <Box>
              <Button
                onClick={() =>
                  handleRewardsModal({
                    open: true,
                    status: ModalStatus.IN_PROGRESS,
                    isSingleRewardWithdraw: false,
                    amount: availableRewards.toString()
                  })
                }
                sx={{ fontWeight: 700 }}
                disabled={!stakedValidators.length}
                variant="contained"
                color="primary"
              >
                Claim Rewards
              </Button>
            </Box>
          </Box>
        </Box>
      </Grid>
      <ClaimRewardsModal />
      <UnbondingModal />
    </Card>
  )
}

export default WalletInformation
