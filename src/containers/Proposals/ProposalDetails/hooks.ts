import * as R from 'ramda'
import { updateProposalDetails } from 'store/proposalDetails'
import { RootState } from 'store'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import {
  useProposalDetailsSubSubscription,
  ProposalDetailsQuery
} from '../../../graphql/types'

export const useProposalDetails = () => {
  const dispatch = useDispatch()
  const { proposalId } = useParams()
  const proposalState = useSelector((state: RootState) => state.proposalDetails)

  const handleSetState = (stateChange: any) => {
    dispatch(updateProposalDetails({ ...stateChange }))
  }

  // ==========================
  // parsers
  // ==========================

  const formatProposalQuery = (data: ProposalDetailsQuery | undefined) => {
    const stateChange: any = {
      loading: false
    }

    if (!data?.proposal.length) {
      stateChange.exists = false
      return stateChange
    }

    // =========================
    // overview
    // =========================
    const formatOverview = () => {
      const DEFAULT_TIME = '0001-01-01T00:00:00'
      const votingStartTime = R.pathOr(
        DEFAULT_TIME,
        ['proposal', 0, 'votingStartTime'],
        data
      )
      //   votingStartTime =
      //     votingStartTime === DEFAULT_TIME ? null : votingStartTime
      const votingEndTime = R.pathOr(
        DEFAULT_TIME,
        ['proposal', 0, 'votingEndTime'],
        data
      )
      //   votingEndTime = votingEndTime === DEFAULT_TIME ? null : votingEndTime

      const overview = {
        proposer: R.pathOr('', ['proposal', 0, 'proposer'], data),
        content: R.pathOr('', ['proposal', 0, 'content'], data),
        title: R.pathOr('', ['proposal', 0, 'title'], data),
        id: R.pathOr('', ['proposal', 0, 'proposalId'], data),
        description: R.pathOr('', ['proposal', 0, 'description'], data),
        status: R.pathOr('', ['proposal', 0, 'status'], data),
        submitTime: R.pathOr('', ['proposal', 0, 'submitTime'], data),
        depositEndTime: R.pathOr('', ['proposal', 0, 'depositEndTime'], data),
        votingStartTime,
        votingEndTime
      }

      return overview
    }

    stateChange.overview = formatOverview()

    return stateChange
  }

  // ==========================
  // fetch data
  // ==========================
  useProposalDetailsSubSubscription({
    variables: {
      proposalId: Number(proposalId) || 0
    },
    onSubscriptionData: (data) => {
      handleSetState(formatProposalQuery(data.subscriptionData.data))
    }
  })

  return {
    proposalState
  }
}
