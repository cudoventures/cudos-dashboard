import { Box, Stack, Typography } from '@mui/material'
import { fetchDelegations } from 'api/getAccountDelegations'
import { fetchRedelegations } from 'api/getAccountRedelegations'
import { fetchUndedelegations } from 'api/getAccountUndelegations'
import { fetchRewards } from 'api/getRewards'
import BigNumber from 'bignumber.js'
import Card from 'components/Card'
import { useNotifications } from 'components/NotificationPopup/hooks'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'store'
import { updateUser } from 'store/profile'
import { formatNumber } from 'utils/format_token'
import { formatBigNum } from 'utils/projectUtils'

const MyDelegations = () => {
  const {
    delegations,
    redelegations,
    undelegations,
    stakedValidators,
    address
  } = useSelector((state: RootState) => state.profile)
  const { validator } = useSelector(
    (state: RootState) => state.validatorDetails
  )

  const dispatch = useDispatch()

  const { setError } = useNotifications()

  let redelegationsBalance = new BigNumber(0)
  let undelegationsBalance = new BigNumber(0)

  const price = useSelector((state: RootState) => state.market.price)

  const calculateValue = (cudos: string) => {
    return `${(Number(price) * Number(cudos)).toFixed(2)}`
  }

  const checkIfDelegated = delegations.filter(
    (value) => value.address === validator
  )

  const checkIfRedelegated = redelegations.filter(
    (value) => value.sourceAddress === validator
  )

  const checkIfUndelegated = undelegations.filter(
    (value) => value.validatorAddress === validator
  )

  const checkRewards = stakedValidators.filter(
    (value) => value.address === validator
  )

  for (let i = 0; i < checkIfRedelegated.length; i++) {
    for (let j = 0; j < checkIfRedelegated[i].amount.length; j++) {
      redelegationsBalance = BigNumber.sum(
        checkIfRedelegated[i].amount[j],
        redelegationsBalance
      )
    }
  }

  for (let i = 0; i < checkIfUndelegated.length; i++) {
    for (let j = 0; j < checkIfUndelegated[i].amount.length; j++) {
      undelegationsBalance = BigNumber.sum(
        checkIfUndelegated[i].amount[j],
        undelegationsBalance
      )
    }
  }

  useEffect(() => {
    const controller = new AbortController()
    const fetchData = async () => {
      try {
        const { validatorArray } = await fetchRewards(
          address,
          controller.signal
        )

        const { redelegationsArray } = await fetchRedelegations(
          address,
          controller.signal
        )
        const { undelegationsArray } = await fetchUndedelegations(
          address,
          controller.signal
        )
        const { delegationsArray } = await fetchDelegations(
          address,
          controller.signal
        )

        dispatch(
          updateUser({
            stakedValidators: validatorArray,
            delegations: delegationsArray,
            redelegations: redelegationsArray,
            undelegations: undelegationsArray
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
  }, [address, dispatch])

  return (
    <Card sx={{ minHeight: '200px' }}>
      <Typography
        letterSpacing={1}
        fontWeight={700}
        color="text.secondary"
        textTransform="uppercase"
        fontSize="14px"
      >
        My Delegations
      </Typography>
      {checkIfDelegated.length ? (
        <Box
          display="flex"
          justifyContent="space-between"
          sx={{ padding: '2rem' }}
        >
          <Box display="flex" flexDirection="column" gap={0.5}>
            <Typography
              variant="caption"
              fontWeight={700}
              color="text.secondary"
              textTransform="uppercase"
            >
              Delegations
            </Typography>
            <Stack direction="row" gap={1} alignItems="center">
              <Typography fontWeight={700}>
                {formatNumber(
                  formatBigNum(
                    new BigNumber(
                      checkIfDelegated[0].amount || new BigNumber(0)
                    )
                  ),
                  2
                )}
              </Typography>
              <Typography fontWeight={700} color="text.secondary">
                CUDOS
              </Typography>
            </Stack>
            <Typography variant="body2" fontWeight={700} color="primary.main">
              $
              {formatNumber(
                calculateValue(
                  formatBigNum(
                    new BigNumber(
                      checkIfDelegated[0].amount || new BigNumber(0)
                    )
                  )
                ),
                2
              )}
            </Typography>
          </Box>
          <Box display="flex" flexDirection="column" gap={0.5}>
            <Typography
              variant="caption"
              fontWeight={700}
              color="text.secondary"
              textTransform="uppercase"
            >
              Redelegations
            </Typography>
            <Stack direction="row" gap={1} alignItems="center">
              <Typography fontWeight={700}>
                {formatNumber(formatBigNum(redelegationsBalance), 2)}
              </Typography>
              <Typography fontWeight={700} color="text.secondary">
                CUDOS
              </Typography>
            </Stack>
            <Typography variant="body2" fontWeight={700} color="primary.main">
              $
              {formatNumber(
                calculateValue(formatBigNum(redelegationsBalance)),
                2
              )}
            </Typography>
          </Box>
          <Box display="flex" flexDirection="column" gap={0.5}>
            <Typography
              variant="caption"
              fontWeight={700}
              color="text.secondary"
              textTransform="uppercase"
            >
              Undelegations
            </Typography>
            <Stack direction="row" gap={1} alignItems="center">
              <Typography fontWeight={700}>
                {formatNumber(formatBigNum(undelegationsBalance), 2)}
              </Typography>
              <Typography fontWeight={700} color="text.secondary">
                CUDOS
              </Typography>
            </Stack>
            <Typography variant="body2" fontWeight={700} color="primary.main">
              $
              {formatNumber(
                calculateValue(formatBigNum(undelegationsBalance)),
                2
              )}
            </Typography>
          </Box>
          <Box display="flex" flexDirection="column" gap={0.5}>
            <Typography
              variant="caption"
              fontWeight={700}
              color="text.secondary"
              textTransform="uppercase"
            >
              Rewards
            </Typography>
            <Stack direction="row" gap={1} alignItems="center">
              <Typography fontWeight={700}>
                {formatNumber(
                  formatBigNum(
                    new BigNumber(
                      checkRewards.length
                        ? checkRewards[0].amount
                        : new BigNumber(0)
                    )
                  ),
                  2
                )}
              </Typography>
              <Typography fontWeight={700} color="text.secondary">
                CUDOS
              </Typography>
            </Stack>
            <Typography variant="body2" fontWeight={700} color="primary.main">
              $
              {calculateValue(
                formatNumber(
                  formatBigNum(
                    checkRewards.length
                      ? new BigNumber(checkRewards[0].amount)
                      : new BigNumber(0)
                  ),
                  2
                )
              )}
            </Typography>
          </Box>
        </Box>
      ) : (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '50px'
          }}
        >
          <Typography fontSize="20px">
            You have not delageted to this validator yet.
          </Typography>
        </Box>
      )}
    </Card>
  )
}

export default MyDelegations
