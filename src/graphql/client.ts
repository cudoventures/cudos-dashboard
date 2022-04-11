import {
  ApolloClient,
  InMemoryCache,
  split,
  HttpLink,
  ApolloLink,
  concat,
  NormalizedCacheObject
} from '@apollo/client'
import { getMainDefinition } from '@apollo/client/utilities'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { createClient } from 'graphql-ws'

import { useMemo } from 'react'

const defaultOptions: any = {
  watchQuery: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all'
  },
  query: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all'
  }
}

let apolloClient: ApolloClient<NormalizedCacheObject>

const httpLink = new HttpLink({
  uri: import.meta.env.VITE_GRAPHQL_URL?.toString()
})

const subscriptionLink = new GraphQLWsLink(
  createClient({
    url: import.meta.env.VITE_GRAPHQL_WS?.toString() || 'ws://localhost:3000'
  })
)

const link =
  typeof window !== 'undefined'
    ? split(
        ({ query }) => {
          const { kind, operation }: any = getMainDefinition(query)
          return kind === 'OperationDefinition' && operation === 'subscription'
        },
        subscriptionLink,
        httpLink
      )
    : httpLink

const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {}
  })

  return forward(operation)
})

function createApolloClient() {
  const client = new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: concat(authMiddleware, link),
    cache: new InMemoryCache({})
  })

  client.defaultOptions = defaultOptions

  return client
}

export function initializeApollo(initialState: any) {
  // eslint-disable-next-line
  const _apolloClient = apolloClient ?? createApolloClient()

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract()
    // Restore the cache using the data passed from getStaticProps/getServerSideProps
    // combined with the existing cached data
    _apolloClient.cache.restore({
      ...existingCache,
      ...initialState
    })
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient

  return _apolloClient
}

export function useApollo(initialState: any) {
  const store = useMemo(() => initializeApollo(initialState), [initialState])
  return store
}
