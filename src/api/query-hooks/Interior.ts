import { InteriorType } from '@/components/InteriorManager/InteriorManager'
import { MutationOptions, useInfiniteQuery, useMutation, useQuery } from 'react-query'
import InteriorService from '../services/Interior'

/**
 * Query all interiors in the database with pagination
 *
 * @param skip
 * @param limit
 * @param initialData
 * @returns
 */
export function useQueryInteriors(initialData: InteriorType[], skip = 0, limit = 10) {
  return useInfiniteQuery({
    queryKey: ['interiors'],
    queryFn: ({ pageParam }) => InteriorService.getInteriors(pageParam[0], pageParam[1]),
    // getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
    initialData: { pages: [initialData], pageParams: [{ skip, limit }] },
  })
}

/**
 * Query a single interior by id
 *
 * @param id interior id to query
 * @param interval if poll, what should be the interval
 * @returns
 */
export function useQueryInterior(id?: string, interval?: number) {
  return useQuery({
    enabled: !!id,
    queryKey: ['interior', id],
    queryFn: () => InteriorService.getInterior(id!),
    ...(!!interval && { refetchInterval: interval }),
  })
}

/**
 *
 * @returns
 */
export function useMutateInterior({
  onSuccess,
}: Pick<MutationOptions<InteriorType, unknown, InteriorType, unknown>, 'onSuccess'>) {
  return useMutation({ mutationFn: (interior: InteriorType) => InteriorService.createInterior(interior), onSuccess })
}
