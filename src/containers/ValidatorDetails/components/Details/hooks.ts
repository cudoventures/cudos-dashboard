import { useState, useEffect } from 'react'
import * as R from 'ramda'
import { formatToken } from 'utils/format_token'
import {
  useValidatorDetailsQuery,
  useValidatorLastSeenListenerSubscription,
  ValidatorDetailsQuery,
  ValidatorLastSeenListenerSubscription
} from 'graphql/types'
import { useDesmosProfile } from 'hooks'
import { getValidatorCondition } from 'utils/get_validator_condition'
import { chainConfig } from 'configs'
import { SlashingParams } from 'models'
import { useParams } from 'react-router-dom'
import { updateValidatorDetails } from 'store/validatorDetails'
import { useDispatch } from 'react-redux'
import { ValidatorDetailsState } from './types'

const initialTokenDenom: TokenUnit = {
  value: '0',
  displayDenom: '',
  baseDenom: '',
  exponent: 0
}

const initialState: ValidatorDetailsState = {
  loading: true,
  exists: true,
  desmosProfile: null,
  status: {
    status: 0,
    jailed: false,
    tombstoned: false,
    condition: 0,
    commission: 0,
    missedBlockCounter: 0,
    signedBlockWindow: 0,
    maxRate: '0',
    lastSeen: ''
  },
  votingPower: {
    height: 0,
    overall: initialTokenDenom,
    self: 0
  }
}

export const useValidatorDetails = () => {
  const { validatorId } = useParams()
  const [state, setState] = useState<ValidatorDetailsState>(initialState)

  const dispatch = useDispatch()

  const handleSetState = (stateChange: any) => {
    setState((prevState) => R.mergeDeepLeft(stateChange, prevState))
  }

  // ==========================
  // Desmos Profile
  // ==========================
  const { formatDesmosProfile } = useDesmosProfile({
    onComplete: (data) => {
      handleSetState({
        desmosProfile: formatDesmosProfile(data)
      })
    }
  })

  useEffect(() => {
    handleSetState(initialState)
  }, [])

  const formatAccountQuery = (data: ValidatorDetailsQuery) => {
    const stateChange: any = {
      loading: false
    }

    if (!data.validator.length) {
      stateChange.exists = false
      return stateChange
    }

    // ============================
    // overview
    // ============================
    const formatOverview = () => {
      const operatorAddress = R.pathOr(
        '',
        ['validator', 0, 'validatorInfo', 'operatorAddress'],
        data
      )
      const selfDelegateAddress = R.pathOr(
        '',
        ['validator', 0, 'validatorInfo', 'selfDelegateAddress'],
        data
      )
      const profile = {
        validator: operatorAddress,
        operatorAddress,
        selfDelegateAddress,
        description: R.pathOr(
          '',
          ['validatorDescriptions', 0, 'details'],
          data.validator[0]
        ),
        website: R.pathOr(
          '',
          ['validatorDescriptions', 0, 'website'],
          data.validator[0]
        ),
        avatarUrl: R.pathOr(
          '',
          ['validatorDescriptions', 0, 'avatarUrl'],
          data.validator[0]
        ),
        moniker: R.pathOr(
          '',
          ['validatorDescriptions', 0, 'moniker'],
          data.validator[0]
        )
      }

      return { ...profile }
    }

    const validatorDetails = formatOverview()
    dispatch(updateValidatorDetails(validatorDetails))

    // ============================
    // status
    // ============================
    const formatStatus = () => {
      const slashingParams = SlashingParams.fromJson(
        R.pathOr({}, ['slashingParams', 0, 'params'], data)
      )
      const missedBlockCounter = R.pathOr(
        0,
        ['validatorSigningInfos', 0, 'missedBlocksCounter'],
        data.validator[0]
      )
      const { signedBlockWindow } = slashingParams
      const condition = getValidatorCondition(
        signedBlockWindow,
        missedBlockCounter
      )

      const profile = {
        status: R.pathOr(
          3,
          ['validatorStatuses', 0, 'status'],
          data.validator[0]
        ),
        jailed: R.pathOr(
          false,
          ['validatorStatuses', 0, 'jailed'],
          data.validator[0]
        ),
        tombstoned: R.pathOr(
          false,
          ['validatorSigningInfos', 0, 'tombstoned'],
          data.validator[0]
        ),
        commission:
          R.pathOr(
            0,
            ['validatorCommissions', 0, 'commission'],
            data.validator[0]
          ) * 100,
        condition,
        missedBlockCounter,
        signedBlockWindow,
        maxRate: R.pathOr(
          '0',
          ['validator', 0, 'validatorInfo', 'maxRate'],
          data
        )
      }

      return profile
    }

    stateChange.status = formatStatus()
    // ============================
    // votingPower
    // ============================
    const formatVotingPower = () => {
      const selfVotingPower = R.pathOr(
        0,
        ['validatorVotingPowers', 0, 'votingPower'],
        data.validator[0]
      )

      const votingPower = {
        self: selfVotingPower,
        overall: formatToken(
          R.pathOr(0, ['stakingPool', 0, 'bonded'], data),
          chainConfig.votingPowerTokenUnit
        ),
        height: R.pathOr(
          0,
          ['validatorVotingPowers', 0, 'height'],
          data.validator[0]
        )
      }

      return votingPower
    }
    stateChange.votingPower = formatVotingPower()

    return stateChange
  }

  const formatAccountSubscription = (
    data: ValidatorLastSeenListenerSubscription
  ) => {
    const stateChange: any = {
      loading: false
    }

    stateChange.status = {
      ...state.status,
      lastSeen: R.pathOr(
        '',
        ['subscriptionData', 'data', 'preCommit', 0, 'timestamp'],
        data
      )
    }

    return stateChange
  }

  // ==========================
  // Fetch Data
  // ==========================
  useValidatorDetailsQuery({
    variables: {
      address: validatorId
    },
    onCompleted: (data) => {
      handleSetState(formatAccountQuery(data))
    }
  })

  useValidatorLastSeenListenerSubscription({
    variables: {
      address: validatorId
    },
    onSubscriptionData: (data: any) => {
      handleSetState(formatAccountSubscription(data))
    }
  })

  return {
    state
  }
}
