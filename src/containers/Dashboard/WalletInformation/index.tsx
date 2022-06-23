import { useEffect, useState } from 'react'
import { Box, Button, Stack, Tooltip, Typography } from '@mui/material'
import Card from 'components/Card'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'store'
import getCurrencyRate from 'api/getCurrency'
import { TransactionCurrency, updateUser } from 'store/profile'
import { copyToClipboard, formatAddress } from 'utils/projectUtils'

import CopyIcon from 'assets/vectors/copy-icon.svg'
import LinkIcon from 'assets/vectors/link-icon.svg'
import CudosLogo from 'assets/vectors/cudos-logo.svg?component'
import { formatNumber } from 'utils/format_token'
import BigNumber from 'bignumber.js'
import { claimRewards } from 'ledgers/transactions'
import { styles } from '../styles'

const WalletInformation: React.FC = () => {
  const [rate, setRate] = useState<number>(0)
  const [copied, setCopied] = useState<boolean>(false)
  const {
    balance,
    availableRewards,
    stakedBalance,
    address,
    stakedValidators
  } = useSelector((state: RootState) => state.profile)
  const dispatch = useDispatch()

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

  const handleRewardClaim = async () => {
    if (Number.isNaN(new BigNumber(availableRewards))) {
      alert('No available rewards to claim.')
      return
    }

    const result = await claimRewards(stakedValidators, address)

    if (result.transactionHash && result.code === 0) {
      alert('Success')
      dispatch(updateUser({ availableRewards: new BigNumber(0) }))
    } else {
      alert('Transaction Failed')
    }
  }

  return (
    <Card
      sx={{
        width: '100%',
        display: 'flex',
        gap: 8
      }}
    >
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
              {formatNumber(balance.toString(), 2)}
            </Typography>
            <Typography color="primary.main" fontWeight={700}>
              ${formatNumber((rate * Number(balance)).toString(), 2)}
            </Typography>
          </Box>
        </Box>
        <Box sx={styles.addressContainer}>
          <Typography variant="body1">{formatAddress(address, 20)}</Typography>
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
                  `${import.meta.env.VITE_APP_EXPLORER_V2}/accounts/${address}`,
                  '_blank'
                )
                ?.focus()
            }
          >
            <img style={{ cursor: 'pointer' }} src={LinkIcon} alt="Link" />
          </Tooltip>
        </Box>
      </Box>
      <Box sx={styles.stakingContainer}>
        <Typography variant="h6" fontWeight={700} letterSpacing={1}>
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
          <Stack direction="row" alignItems="center" gap="6px">
            <CudosLogo style={{ width: '20px', height: 'auto' }} />
            <Typography variant="h5" fontWeight={700}>
              {formatNumber(stakedBalance.toString(), 2)}
            </Typography>
            <Typography variant="h6" color="primary.main" fontWeight={700}>
              ${formatNumber((rate * Number(stakedBalance)).toString(), 2)}
            </Typography>
          </Stack>
        </Box>
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
            <Stack direction="row" alignItems="center" gap="6px">
              <CudosLogo style={{ width: '20px', height: 'auto' }} />
              <Typography variant="h5" fontWeight={700}>
                {formatNumber(availableRewards.toString(), 2)}
              </Typography>
              <Typography variant="h6" color="primary.main" fontWeight={700}>
                ${formatNumber((rate * Number(availableRewards)).toString(), 2)}
              </Typography>
            </Stack>
          </Box>
          <Box>
            <Button
              onClick={handleRewardClaim}
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
    </Card>
  )
}

export default WalletInformation
