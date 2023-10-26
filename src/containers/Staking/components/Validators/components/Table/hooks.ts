import { useEffect } from 'react'
import * as R from 'ramda'
import numeral from 'numeral'
import Big from 'big.js'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from 'store'
import { ValidatorType, updateValidators } from 'store/validator'
import { getValidatorCondition } from 'utils/get_validator_condition'
import { formatToken } from 'utils/format_token'
import { useValidatorsQuery, ValidatorsQuery } from 'graphql/types'
import { StakingParams, SlashingParams } from 'models'
import { useApolloClient } from '@apollo/client';
import { Delegation, DelegationsResponse, FETCH_DELEGATIONS } from './utils'

export default () => {
  const dispatch = useDispatch()
  const client = useApolloClient()

  const fetchDelegationsForValidator = async (validatorAddress: string): Promise<Delegation[]> => {
    const result = await client.query<DelegationsResponse>({
      query: FETCH_DELEGATIONS,
      variables: {
        validatorAddress,
        limit: 10
      }
    });
    return result.data.action_validator_delegations.delegations
  };

  const sortKey = useSelector((state: RootState) => state.validator.sortKey)
  const filter = useSelector((state: RootState) => state.validator.filter)
  const sortDirection = useSelector(
    (state: RootState) => state.validator.sortDirection
  )
  const items = useSelector((state: RootState) => state.validator.items)
  const tab = useSelector((state: RootState) => state.validator.tab)
  const address = useSelector((state: RootState) => state.profile.address)

  const stakedValidators = useSelector(
    (state: RootState) => state.profile.stakedValidators
  ).map((validator) => validator.address)
  const stakedBalance = useSelector((state: RootState) =>
    Number(state.profile.stakedBalance)
  )

  const handleSetState = (stateChange: any) => {
    dispatch(updateValidators({ ...stateChange }))
  }

  const formatValidators = async (data: ValidatorsQuery) => {
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

    let formattedItemsPromises: Promise<ValidatorType>[] = data.validator
      .filter((x) => x.validatorInfo)
      .map(async (x) => {

        const delegations = await fetchDelegationsForValidator(x.validatorInfo?.operatorAddress!)

        const votingPower = R.pathOr(
          0,
          ['validatorVotingPowers', 0, 'votingPower'],
          x
        )
        const votingPowerPercent =
          numeral((votingPower / votingPowerOverall) * 100).value() || 0
        const totalDelegations = delegations.reduce((a, b) => {
          return (
            a + (numeral(R.pathOr(0, ['coins', 0, 'amount'], b)).value() || 0)
          )
        }, 0)

        const [selfDelegation] = delegations.filter((y) => {
          return y.delegator_address === x.validatorInfo?.selfDelegateAddress
        }) || [0]
        const self = numeral(
          R.pathOr(0, ['coins', 0, 'amount'], selfDelegation)
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
        const myDelegation = delegations.find(
          (delegation) => delegation.delegator_address === address
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
          delegators: delegations.length || 0,
          avatarUrl: R.pathOr('', ['validatorDescription', 0, 'avatarUrl'], x),
          moniker: R.pathOr('', ['validatorDescription', 0, 'moniker'], x),
          myDelegation: myDelegation
            ? Number(myDelegation?.coins[0].amount)
            : undefined
        }
      })

    let formattedItems: ValidatorType[] = await Promise.all(formattedItemsPromises)

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

  const handleSort = (key: string) => {
    if (key === sortKey) {
      dispatch(
        updateValidators({
          sortDirection: sortDirection === 'asc' ? 'desc' : 'asc'
        })
      )
    } else {
      dispatch(
        updateValidators({
          sortKey: key,
          sortDirection: 'desc' // new key so we start the sort by asc
        })
      )
    }
  }

  const sortItems = (items: ValidatorType[]) => {
    let sorted: ValidatorType[] = R.clone(items)

    if (tab === 0) {
      sorted = sorted.filter((x) => x.status === 3)
    }

    if (tab === 1) {
      sorted = sorted.filter((x) => x.status !== 3)
    }

    if (tab === 2) {
      sorted = sorted.filter((x) => stakedValidators.includes(x.validator))
    }

    if (sortKey && sortDirection) {
      sorted.sort((a, b) => {
        let compareA = R.pathOr<number | string>(0, [sortKey], a)
        let compareB = R.pathOr<number | string>(0, [sortKey], b)

        if (typeof compareA === 'string' && typeof compareB === 'string') {
          compareA = compareA.toLowerCase()
          compareB = compareB.toLowerCase()
        }

        if (compareA < compareB) {
          return sortDirection === 'asc' ? -1 : 1
        }
        if (compareA > compareB) {
          return sortDirection === 'asc' ? 1 : -1
        }

        return 0
      })
    }

    if (filter) {
      sorted = sorted.filter(
        (x) => x.moniker.toUpperCase().indexOf(filter) > -1
      )
    }

    return sorted
  }

  const handleSearch = (input: string) => {
    const filter = input.toUpperCase()

    handleSetState({ filter })
  }

  // ==========================
  // Fetch Data
  // ==========================
  const validatorsQuery = useValidatorsQuery({
    onCompleted: async (data) => {
      const formattedData = await formatValidators(data)
      handleSetState({
        loading: false,
        ...formattedData
      })
    }
  })

  useEffect(() => {
    const fetchValidators = async () => {
      await validatorsQuery.fetchMore({}).then(async ({ data }) => {
        const formattedData = await formatValidators(data)
        handleSetState({
          delegations: {
            loading: false,
            ...formattedData
          }
        })
      })
    }

    // fetching with a timeout to give time for the delegations to update
    setTimeout(async () => {
      await fetchValidators()
    }, 5000)
  }, [address, stakedBalance])

  useEffect(() => {
    return handleSearch('')
  }, [])

  return {
    state: {
      sortDirection,
      sortKey,
      items,
      filter
    },
    handleSort,
    sortItems,
    handleSearch
  }
}
