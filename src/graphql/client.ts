import { useMemo } from 'react'
import {
  ApolloClient,
  ApolloLink,
  concat,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
  split
} from '@apollo/client'
import { createClient } from 'graphql-ws'
import { getMainDefinition } from '@apollo/client/utilities'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { ApolloLinks } from './helpers'

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

const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {}
  })

  return forward(operation)
})

function createApolloClient(apolloLinks?: ApolloLinks) {

  const httpLink = new HttpLink({
    uri: apolloLinks?.uri as string
  })

  const subscriptionLink = new GraphQLWsLink(
    createClient({
      url: apolloLinks?.url as string
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

  const client = new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: concat(authMiddleware, link),
    cache: new InMemoryCache({})
  })

  client.defaultOptions = defaultOptions

  return client
}

export function initializeApollo(initialState: any, apolloLinks: ApolloLinks) {
  // eslint-disable-next-line
  const _apolloClient = createApolloClient(apolloLinks)

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

  const newApolloClient = useMemo(() => (apolloLinks?: ApolloLinks) => {
    const store = initializeApollo(initialState, apolloLinks!)
    return store

    //eslint-disable-next-line
  }, [initialState])

  return newApolloClient
}
