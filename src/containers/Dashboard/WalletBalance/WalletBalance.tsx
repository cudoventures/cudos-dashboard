import { useEffect, useState } from 'react'
import { Typography, Box, Button, Popover } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'store'
import BigNumber from 'bignumber.js'
import { claimRewards } from 'ledgers/transactions'
import { getStakedBalance, getWalletBalance } from 'utils/projectUtils'
import getCurrencyRate from 'api/getCurrency'
import Card from 'components/Card'
import CudosLogo from 'assets/vectors/cudos-logo.svg'
import InfoIcon from 'assets/vectors/info-alt.svg'
import { fetchRewards } from 'api/getRewards'

import { updateUser, TransactionCurrency } from 'store/profile'
import { styles } from '../styles'

const WalletBalance = () => {
  const {
    balance,
    address,
    availableRewards,
    stakedValidators,
    lastLoggedAddress,
    stakedBalance
  } = useSelector((state: RootState) => state.profile)

  const dispatch = useDispatch()

  const [rate, setRate] = useState<number>(0)
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)

  useEffect(() => {
    const getCurrencies = async () => {
      const response = await getCurrencyRate(TransactionCurrency.USD)

      setRate(response.data.cudos[TransactionCurrency.USD])
    }

    getCurrencies()
  }, [address])

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

        dispatch(
          updateUser({
            address,
            balance: new BigNumber(walletBalance),
            availableRewards: new BigNumber(totalRewards),
            stakedValidators: validatorArray,
            lastLoggedAddress,
            stakedBalance: new BigNumber(stakedAmountBalance)
          })
        )
      } catch (error: any) {
        alert(error.message)
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

  const handleRewardClaim = async () => {
    if (Number.isNaN(new BigNumber(availableRewards))) {
      alert('No available rewards to claim.')
      return
    }

    const result = await claimRewards(stakedValidators, address)

    if (result.transactionHash && result.code === 0) {
      alert('Success')
    } else {
      alert('Transaction Failed')
    }
  }

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handlePopoverClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)

  return (
    <Card sx={styles.walletBalanceCard}>
      <Box>
        <Box sx={{ marginBottom: '30px' }}>
          <Typography sx={styles.subheaderStyle} color="text.secondary">
            WALLET BALANCE
          </Typography>
        </Box>
        <Box sx={styles.networkCardStyle}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography
              color="text.secondary"
              sx={styles.networkCardTitleStyle}
              style={{ marginBottom: '15px' }}
            >
              TOTAL BALANCE
            </Typography>
            <Box sx={{ cursor: 'pointer' }}>
              <Typography
                aria-owns={open ? 'mouse-over-popover' : undefined}
                aria-haspopup="true"
                onMouseEnter={handlePopoverOpen}
                onMouseLeave={handlePopoverClose}
                color="primary.main"
                sx={{
                  fontSize: '12px',
                  fontWeight: '600',
                  display: 'flex'
                }}
              >
                Staked Tokens Info
                <img
                  style={{
                    width: '16px',
                    height: '16px',
                    marginLeft: '6px',
                    alignItems: 'center',
                    display: 'flex'
                  }}
                  src={InfoIcon}
                  alt="Info"
                />
              </Typography>
              <Popover
                PaperProps={{
                  style: styles.stakedTokensInfo
                }}
                id="mouse-over-popover"
                sx={{
                  pointerEvents: 'none'
                }}
                open={open}
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left'
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left'
                }}
                onClose={handlePopoverClose}
                disableRestoreFocus
              >
                <Typography
                  sx={{
                    color: ' #7D87AA',
                    marginBottom: '15px',
                    fontWeight: '600'
                  }}
                >
                  STAKED TOKENS
                </Typography>
                <Typography color="primary.main" sx={{ fontSize: '12px' }}>
                  Staked
                </Typography>
                <Typography sx={{ fontSize: '20px', fontWeight: '600' }}>
                  {new BigNumber(stakedBalance).toFormat(2)} CUDOS
                </Typography>
              </Popover>
            </Box>
          </Box>
          <Box sx={{ display: 'flex' }}>
            <Typography
              sx={{ ...styles.networkCardContentStyle, display: 'flex' }}
            >
              <img
                style={{ marginRight: '5px' }}
                src={CudosLogo}
                alt="Cudos Logo"
              />
              {new BigNumber(balance).toFormat(2)}
            </Typography>
            <Typography
              color="text.secondary"
              sx={{ ...styles.networkCardContentStyle, marginLeft: '5px' }}
            >
              CUDOS
            </Typography>
            <Typography color="primary.main" sx={styles.amountDollarStyle}>
              {`$${(rate * Number(balance)).toFixed(2)}`}
            </Typography>
          </Box>
        </Box>
        <Box sx={styles.networkCardStyle}>
          <Typography
            component="span"
            color="text.secondary"
            sx={styles.networkCardTitleStyle}
          >
            AVAILABLE REWARDS
            <Box
              sx={{ display: 'flex', justifyContent: 'flex-end', flex: '1' }}
            >
              <Button
                onClick={() => handleRewardClaim()}
                sx={styles.claimButtonStyle}
                disabled={!stakedValidators.length}
                variant="contained"
                color="primary"
              >
                Claim
              </Button>
            </Box>
          </Typography>
          <Box sx={{ display: 'flex' }}>
            <Typography
              sx={{ ...styles.networkCardContentStyle, display: 'flex' }}
            >
              <img
                style={{ marginRight: '5px' }}
                src={CudosLogo}
                alt="Cudos Logo"
              />
              {!availableRewards || Number.isNaN(Number(availableRewards))
                ? '0.00'
                : Number(availableRewards).toFixed(2)}
            </Typography>
            <Typography
              color="text.secondary"
              sx={{ ...styles.networkCardContentStyle, marginLeft: '5px' }}
            >
              CUDOS
            </Typography>
            <Typography color="primary.main" sx={styles.amountDollarStyle}>
              {!availableRewards || Number.isNaN(Number(availableRewards))
                ? '$0.00'
                : `$${(rate * Number(availableRewards)).toFixed(2)}`}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Card>
  )
}

export default WalletBalance
