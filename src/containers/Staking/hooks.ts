import * as R from 'ramda'
import numeral from 'numeral'
import Big from 'big.js'
import { useSelector, useDispatch } from 'react-redux'

import { RootState } from 'store'
import {
  ValidatorType,
  updateValidators,
  ModalProps
} from '../../store/validator'
import { getValidatorCondition } from '../../utils/get_validator_condition'
import { formatToken } from '../../utils/format_token'
import { useValidatorsQuery, ValidatorsQuery } from '../../graphql/types'
import { StakingParams, SlashingParams } from '../../models'

export default () => {
  const dispatch = useDispatch()
  const state = useSelector((state: RootState) => state.validator)

  const handleSetState = (stateChange: any) => {
    dispatch(updateValidators({ ...stateChange }))
  }

  const formatValidators = (data: ValidatorsQuery) => {
    const stakingParams = StakingParams.fromJson(
      R.pathOr({}, ['stakingParams', 0, 'params'], data)
    )
    const slashingParams = SlashingParams.fromJson(
      R.pathOr({}, ['slashingParams', 0, 'params'], data)
    )
    const votingPowerOverall =
      numeral(
        formatToken(
          R.pathOr(0, ['stakingPool', 0, 'bondedTokens'], data),
          stakingParams.bondDenom
        ).value
      ).value() || 0

    const { signedBlockWindow } = slashingParams

    let formattedItems: ValidatorType[] = data.validator
      .filter((x) => x.validatorInfo)
      .map((x) => {
        const votingPower = R.pathOr(
          0,
          ['validatorVotingPowers', 0, 'votingPower'],
          x
        )
        const votingPowerPercent =
          numeral((votingPower / votingPowerOverall) * 100).value() || 0
        const totalDelegations = x.delegations.reduce((a, b) => {
          return (
            a + (numeral(R.pathOr(0, ['amount', 'amount'], b)).value() || 0)
          )
        }, 0)

        const [selfDelegation] = x.delegations.filter((y) => {
          return y.delegatorAddress === x.validatorInfo?.selfDelegateAddress
        })
        const self = numeral(
          R.pathOr(0, ['amount', 'amount'], selfDelegation)
        ).value()
        const selfPercent = ((self || 0) / (totalDelegations || 1)) * 100

        const missedBlockCounter = R.pathOr(
          0,
          ['validatorSigningInfos', 0, 'missedBlocksCounter'],
          x
        )
        const condition = getValidatorCondition(
          signedBlockWindow,
          missedBlockCounter
        )

        return {
          validator: x.validatorInfo?.operatorAddress || '',
          votingPower,
          votingPowerPercent,
          commission:
            R.pathOr(0, ['validatorCommissions', 0, 'commission'], x) * 100,
          self,
          selfPercent,
          condition,
          status: R.pathOr(0, ['validatorStatuses', 0, 'status'], x),
          jailed: R.pathOr(false, ['validatorStatuses', 0, 'jailed'], x),
          tombstoned: R.pathOr(
            false,
            ['validatorSigningInfos', 0, 'tombstoned'],
            x
          ),
          delegators: x.delegations.length,
          avatarUrl: R.pathOr('', ['validatorDescription', 0, 'avatarUrl'], x),
          moniker: R.pathOr('', ['validatorDescription', 0, 'moniker'], x)
        }
      })

    // get the top 34% validators
    formattedItems = formattedItems.sort((a, b) => {
      return a.votingPower > b.votingPower ? -1 : 1
    })

    // add key to indicate they are part of top 34%
    let cumulativeVotingPower = Big(0)
    let reached = false
    formattedItems.forEach((x) => {
      if (x.status === 3) {
        const totalVp = cumulativeVotingPower.add(x.votingPowerPercent || 0)
        if (totalVp.lte(34) && !reached) {
          x.topVotingPower = true
        }

        if (totalVp.gt(34) && !reached) {
          x.topVotingPower = true
          reached = true
        }

        cumulativeVotingPower = totalVp
      }
    })

    return {
      votingPowerOverall,
      items: formattedItems
    }
  }

  const handleTabChange = (_event: any, newValue: number) => {
    dispatch(updateValidators({ ...state, tab: newValue }))
  }

  const handleSort = (key: string) => {
    if (key === state.sortKey) {
      dispatch(
        updateValidators({
          ...state,
          sortDirection: state.sortDirection === 'asc' ? 'desc' : 'asc'
        })
      )
    } else {
      dispatch(
        updateValidators({
          ...state,
          sortKey: key,
          sortDirection: 'desc' // new key so we start the sort by asc
        })
      )
    }
  }

  const sortItems = (items: ValidatorType[]) => {
    let sorted: ValidatorType[] = R.clone(items)

    if (state.tab === 0) {
      sorted = sorted.filter((x) => x.status === 3)
    }

    if (state.tab === 1) {
      sorted = sorted.filter((x) => x.status !== 3)
    }

    if (state.sortKey && state.sortDirection) {
      sorted.sort((a, b) => {
        let compareA = R.pathOr<number | string>(0, [state.sortKey], a)
        let compareB = R.pathOr<number | string>(0, [state.sortKey], b)

        if (typeof compareA === 'string' && typeof compareB === 'string') {
          compareA = compareA.toLowerCase()
          compareB = compareB.toLowerCase()
        }

        if (compareA < compareB) {
          return state.sortDirection === 'asc' ? -1 : 1
        }
        if (compareA > compareB) {
          return state.sortDirection === 'asc' ? 1 : -1
        }

        return 0
      })
    }

    return sorted
  }

  const handleModal = (modalState: ModalProps) => {
    dispatch(
      updateValidators({
        ...state,
        modal: { ...state.modal, ...modalState }
      })
    )
  }

  // ==========================
  // Fetch Data
  // ==========================
  useValidatorsQuery({
    onCompleted: (data) => {
      handleSetState({
        loading: false,
        ...formatValidators(data)
      })
    }
  })

  return {
    state,
    handleTabChange,
    handleSort,
    sortItems,
    handleModal
  }
}
