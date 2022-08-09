import { useEffect } from 'react'
import { updateValidators, ValidatorType } from 'store/validator'
import numeral from 'numeral'
import { Box, Typography, Button, Stack } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { getValidatorConditionClass } from 'utils/get_validator_condition'
import Condition from 'components/Condition'
import AvatarName from 'components/AvatarName'
import Table from 'components/Table'
import { useNotifications } from 'components/NotificationPopup/hooks'
import { formatNumber } from 'utils/format_token'
import { useDispatch } from 'react-redux'
import columns from './utils'
import useTable from './hooks'

const ValidatorsTable: React.FC = () => {
  const { state, handleSort, sortItems, handleModal } = useTable()
  const { setWarning } = useNotifications()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { sortKey, sortDirection } = state
  const items = sortItems(state.items)

  useEffect(() => {
    dispatch(updateValidators({ count: items.length }))
  }, [items.length])

  const formattedItems = items.map((x: ValidatorType, i: number) => {
    const conditionColor =
      x.status === 3 ? getValidatorConditionClass(x.condition) : 'grey'
    const percentDisplay =
      x.status === 3
        ? `${numeral(x.votingPowerPercent).format('0.[00]')}%`
        : '0%'
    const votingPower = numeral(x.votingPower).format('0,0')
    const isJailed = x.jailed
    return {
      idx: `${i + 1}`,
      delegators: numeral(x.delegators).format('0,0'),
      validator: (
        <Box
          onClick={() => {
            navigate(`/staking/${x.validator}`)
          }}
        >
          <AvatarName
            name={x.moniker}
            imageUrl={x.avatarUrl}
            address={x.validator}
          />
        </Box>
      ),
      commission: `${numeral(x.commission).format('0.[00]')}%`,
      self: `${numeral(x.selfPercent).format('0.[00]')}%`,
      condition: (
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          gap={1}
        >
          <Condition color={conditionColor} />
          <Typography>
            {formatNumber(Number(x.condition).toFixed(2), 2)}%
          </Typography>
        </Stack>
      ),
      votingPower: (
        <Box display="flex" alignItems="center" gap={2}>
          <Typography variant="body2" color="text.primary" fontWeight={600}>
            {votingPower}
          </Typography>
          <Typography
            variant="body2"
            fontSize={12}
            color="text.secondary"
            fontWeight={600}
          >
            {percentDisplay}
          </Typography>
        </Box>
      ),
      action: (
        <Button
          variant="contained"
          color="primary"
          sx={() => ({
            height: '34px',
            fontSize: '12px'
          })}
          onClick={() => {
            if (isJailed) {
              setWarning(
                `Are you sure you want to delegate to an inactive validator? You will not earn rewards while they remain inactive`
              )
            }

            handleModal({
              open: true,
              validator: {
                name: x.moniker,
                imageUrl: x.avatarUrl,
                address: x.validator
              },
              status: null,
              amount: null,
              fee: '',
              gasUsed: 0,
              txHash: ''
            })
          }}
        >
          Delegate
        </Button>
      )
    }
  })

  return (
    <Table
      items={formattedItems}
      columns={columns}
      sortKey={sortKey}
      handleSort={handleSort}
      sortDirection={sortDirection}
    />
  )
}

export default ValidatorsTable
