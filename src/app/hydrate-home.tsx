import { queryInteriors } from '@/api/query-hooks/interior'
import { queryClientConfig } from '@/utils/getQueryClient'
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query'
import Home from './home.client'

export default async function HydrateHome() {
  const queryClient = new QueryClient(queryClientConfig)

  await queryClient.prefetchInfiniteQuery(queryInteriors())

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Home />
    </HydrationBoundary>
  )
}
