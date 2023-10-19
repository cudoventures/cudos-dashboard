/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable import/prefer-default-export */
import * as R from 'ramda'
import DOMPurify from 'dompurify'
import { updateProposals } from 'store/proposals'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'store'
import {
  useProposalsListenerSubscription,
  useProposalsQuery,
  ProposalsQuery
} from '../../graphql/types'
import { extractProposalTypeFromContent } from './proposalType'

export const useProposals = () => {
  const dispatch = useDispatch()
  const state = useSelector((state: RootState) => state.proposals)

  const handleSetState = (stateChange: any) => {
    dispatch(updateProposals({ ...stateChange }))
  }

  const formatProposals = (data: ProposalsQuery) => {
    return data.proposals.map((x) => {
      const description = DOMPurify.sanitize(x.description)
      const title = DOMPurify.sanitize(x.title)
      return {
        description,
        id: x.proposalId,
        title,
        status: x.status,
        proposalType: extractProposalTypeFromContent(x.content),
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

  const proposalQuery = useProposalsQuery({
    variables: {
      limit: 10,
      offset: 0
    },
    onCompleted: (data) => {
      const newItems = R.uniq([...state.items, ...formatProposals(data)])
      newItems.sort((a, b) => b.id - a.id)
      handleSetState({
        loading: false,
        items: newItems,
        hasNextPage: true,
        isNextPageLoading: false,
        rawDataTotal: data!.total!.aggregate!.count
      })
    }
  })

  const loadNextPage = async () => {
    handleSetState({
      isNextPageLoading: true
    })
    // refetch query
    await proposalQuery
      .fetchMore({
        variables: {
          offset: state.items.length,
          limit: 25
        }
      })
      .then(({ data }) => {
        const newItems = R.uniq([...state.items, ...formatProposals(data)])
        newItems.sort((a, b) => b.id - a.id)
        // set new state
        handleSetState({
          loading: false,
          items: newItems,
          isNextPageLoading: false,
          hasNextPage: state.items.length < state.rawDataTotal,
          rawDataTotal: data!.total!.aggregate!.count
        })
      })
  }

  const itemCount = state.hasNextPage
    ? state.items.length + 1
    : state.items.length
  const loadMoreItems: any = state.isNextPageLoading ? () => null : loadNextPage
  const isItemLoaded = (index: any) =>
    !state.hasNextPage || index < state.items.length

  return {
    state,
    loadNextPage,
    itemCount,
    loadMoreItems,
    isItemLoaded
  }
}

export const useProposalsSubscription = () => {
  const dispatch = useDispatch()
  const state = useSelector((state: RootState) => state.proposals)

  const handleSetState = (stateChange: any) => {
    dispatch(updateProposals({ ...stateChange }))
  }

  const formatProposalsSubscription = (data: any) => {
    return data.data.proposals.map((x: any) => {
      const description = DOMPurify.sanitize(x.description)
      const title = DOMPurify.sanitize(x.title)
      return {
        description,
        id: x.proposalId,
        title,
        status: x.status,
        proposalType: extractProposalTypeFromContent(x.content),
        proposerAddress: x.proposer_address,
        submitTime: x.submit_time,
        votingEndTime: x.voting_end_time,
        votingStartTime: x.voting_start_time
      }
    })
  }

  // ================================
  // proposals subscription
  // ================================

  useProposalsListenerSubscription({
    variables: {
      limit: 10,
      offset: 0
    },
    onSubscriptionData: (data) => {
      const newItems = R.uniq([
        ...formatProposalsSubscription(data.subscriptionData)
      ])
      newItems.sort((a, b) => b.id - a.id)

      handleSetState({
        items: newItems
      })
    }
  })
  return {
    state
  }
}

export const useProposalsSearch = () => {
  const dispatch = useDispatch()
  const state = useSelector((state: RootState) => state.proposals)

  const handleSetState = (stateChange: any) => {
    dispatch(updateProposals({ ...stateChange }))
  }

  const formatProposalsSubscription = (data: any) => {
    return data.data.proposals.map((x: any) => {
      const description = DOMPurify.sanitize(x.description)
      const title = DOMPurify.sanitize(x.title)
      return {
        description,
        id: x.proposalId,
        title,
        status: x.status,
        proposalType: extractProposalTypeFromContent(x.content),
        proposerAddress: x.proposer_address,
        submitTime: x.submit_time,
        votingEndTime: x.voting_end_time,
        votingStartTime: x.voting_start_time
      }
    })
  }

  // ================================
  // proposals search
  // ================================

  useProposalsListenerSubscription({
    variables: {
      limit: state.rawDataTotal + 1,
      offset: 0
    },
    onSubscriptionData: (data) => {
      const newItems = R.uniq([
        ...formatProposalsSubscription(data.subscriptionData)
      ])
      newItems.sort((a, b) => b.id - a.id)

      handleSetState({
        searchItems: newItems
      })
    }
  })
  return {
    state
  }
}
