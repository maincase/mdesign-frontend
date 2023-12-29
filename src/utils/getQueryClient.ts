import { QueryClient } from '@tanstack/query-core'
import ms from 'ms'
import { cache } from 'react'

const STALE_TIME = ms('5m') // 5 minutes

export const queryClientConfig = {
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: STALE_TIME,
    },
    mutations: {
      onError: (error: Error) => {
        /** You can use toast or notification here */
        console.error(error.message)
      },
    },
  },
}

const getQueryClient = cache(() => new QueryClient(queryClientConfig))
export default getQueryClient
