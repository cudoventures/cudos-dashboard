import React, { useEffect, useState } from 'react'
import { Typography, Box, Button } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'store'
import BigNumber from 'bignumber.js'
import { SigningStargateClient } from 'cudosjs'
// eslint-disable-next-line import/no-extraneous-dependencies
import { MsgWithdrawDelegatorReward } from 'cosmjs-types/cosmos/distribution/v1beta1/tx'
import { getWalletBalance } from '../../../utils/projectUtils'
import getCurrencyRate from '../../../api/getCurrency'
import Card from '../../../components/Card/Card'
import CudosLogo from '../../../assets/vectors/cudos-logo.svg'
import { fetchRewards } from '../../../api/getRewards'

import { styles } from '../styles'
import { updateUser, TransactionCurrency } from '../../../store/profile'
import CosmosNetworkConfig from '../../../ledgers/CosmosNetworkConfig'

const WalletBalance = () => {
  const {
    balance,
    address,
    availableRewards,
    stakedValidators,
    lastLoggedAddress
  } = useSelector((state: RootState) => state.profile)

  const dispatch = useDispatch()

  const [rate, setRate] = useState<number>(0)

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
        dispatch(
          updateUser({
            address,
            balance: new BigNumber(walletBalance),
            availableRewards: new BigNumber(totalRewards),
            stakedValidators: validatorArray,
            lastLoggedAddress
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
  }, [address, dispatch])

  const handleRewardClaim = async () => {
    if (Number.isNaN(new BigNumber(availableRewards))) {
      alert('No available rewards to claim.')
      return
    }
    const msgFee = {
      amount: [
        {
          denom: CosmosNetworkConfig.CURRENCY_DENOM,
          amount: '0'
        }
      ],
      gas: '300000'
    }

    const msgMemo = ''

    const msgAny: any[] = []

    stakedValidators.map((validator) =>
      msgAny.push({
        typeUrl: '/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward',
        value: MsgWithdrawDelegatorReward.fromPartial({
          delegatorAddress: address,
          validatorAddress: validator
        })
      })
    )

    const offlineSigner = window.getOfflineSignerOnlyAmino(
      import.meta.env.VITE_APP_CHAIN_ID
    )

    const client = await SigningStargateClient.connectWithSigner(
      import.meta.env.VITE_APP_RPC,
      offlineSigner
    )

    const result = await client.signAndBroadcast(
      address,
      msgAny,
      msgFee,
      msgMemo
    )

    if (result.transactionHash && result.code === 0) {
      alert('Success')
    } else {
      alert('Transaction Failed')
    }
  }

  return (
    <Card style={styles.walletBalanceCard}>
      <Box>
        <Box sx={{ marginBottom: '30px' }}>
          <Typography style={styles.subheaderStyle} color="text.secondary">
            WALLET BALANCE
          </Typography>
        </Box>
        <Box style={styles.networkCardStyle}>
          <Typography
            color="text.secondary"
            sx={styles.networkCardTitleStyle}
            style={{ marginBottom: '15px' }}
          >
            TOTAL BALANCE
          </Typography>
          <Box sx={{ display: 'flex' }}>
            <Typography
              sx={{ display: 'flex' }}
              style={styles.networkCardContentStyle}
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
              sx={{ marginLeft: '5px' }}
              style={styles.networkCardContentStyle}
            >
              CUDOS
            </Typography>
            <Typography
              color="primary.main"
              sx={{ marginLeft: '5px' }}
              style={styles.amountDollarStyle}
            >
              {`$${(rate * Number(balance)).toFixed(2)}`}
            </Typography>
          </Box>
        </Box>
        <Box style={{ marginBottom: '0px' }} sx={styles.networkCardStyle}>
          <Typography
            component="span"
            color="text.secondary"
            sx={styles.networkCardTitleStyle}
          >
            AVAILABLE REWARDS
            <Box
              style={{ display: 'flex', justifyContent: 'flex-end', flex: '1' }}
            >
              <Button
                onClick={() => handleRewardClaim()}
                style={styles.claimButtonStyle}
                disabled={!stakedValidators.length}
              >
                Claim
              </Button>
            </Box>
          </Typography>
          <Box sx={{ display: 'flex' }}>
            <Typography
              sx={{ display: 'flex' }}
              style={styles.networkCardContentStyle}
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
              sx={{ marginLeft: '5px' }}
              style={styles.networkCardContentStyle}
            >
              CUDOS
            </Typography>
            <Typography
              color="primary.main"
              sx={{ marginLeft: '5px' }}
              style={styles.amountDollarStyle}
            >
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
