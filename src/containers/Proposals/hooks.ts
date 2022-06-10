/* eslint-disable import/prefer-default-export */
import * as R from 'ramda'
import DOMPurify from 'dompurify'
import { updateProposals } from 'store/proposals'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'store'
import { useProposalsListenerSubscription } from '../../graphql/types'

export const useProposals = () => {
  const dispatch = useDispatch()
  const state = useSelector((state: RootState) => state.proposals)

  const handleSetState = (stateChange: any) => {
    dispatch(updateProposals({ ...stateChange }))
  }

  const formatProposals = (data: any) => {
    return data.data.proposals.map((x: any) => {
      const description = DOMPurify.sanitize(x.description)
      const title = DOMPurify.sanitize(x.title)
      return {
        description,
        id: x.proposalId,
        title,
        status: x.status,
        proposalType: x.proposal_type,
        proposerAddress: x.proposer_address,
        submitTime: x.submit_time,
        votingEndTime: x.voting_end_time,
        votingStartTime: x.voting_start_time
      }
    })
  }

  // ================================
  // proposals query
  // ================================

  const proposalQuery = useProposalsListenerSubscription({
    variables: {
      limit: 50,
      offset: 0
    },
    onSubscriptionData: (data) => {
      const newItems = R.uniq([
        ...state.items,
        ...formatProposals(data.subscriptionData)
      ])
      newItems.sort((a, b) => b.id - a.id)

      handleSetState({
        items: newItems,
        hasNextPage: false,
        isNextPageLoading: false,
        rawDataTotal: Number(newItems.length)
      })
    }
  })

  return {
    state
  }
}
