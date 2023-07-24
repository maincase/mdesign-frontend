import { InteriorType } from '@/state/interior/InteriorState'
import {
  MutationOptions,
  QueryFunction,
  QueryOptions,
  useInfiniteQuery,
  useMutation,
  useQuery,
} from '@tanstack/react-query'
import InteriorService from '../services/interior'

/**
 *
 */
export const queryInteriors: Pick<QueryOptions, 'queryKey' | 'queryFn'> & {
  queryFn: QueryFunction<InteriorType[]>
} = {
  queryKey: ['interiors'],
  queryFn: ({ pageParam = { skip: 0, limit: 10 } }) => InteriorService.getInteriors(pageParam.skip, pageParam.limit),
}

/**
 * Query all interiors in the database with pagination
 *
 * @param skip
 * @param limit
 * @param initialData
 * @returns
 */
export function useQueryInteriors(initialData: InteriorType[] = [], skip = 0, limit = 10) {
  return useInfiniteQuery<InteriorType[]>({
    ...queryInteriors,
    getNextPageParam: (lastPage, pages) => ({
      skip: pages.length * (lastPage?.length ?? 0),
      limit,
    }),
    ...(initialData.length > 0 ? { initialData: { pages: [initialData], pageParams: [{ skip, limit }] } } : {}),
  })
}

/**
 *
 * @param id
 * @returns
 */
export const queryInterior: (id: string) => Pick<QueryOptions, 'queryKey' | 'queryFn'> & {
  queryFn: QueryFunction<InteriorType>
} = (id: string) => ({
  queryKey: ['interiors', id],
  queryFn: () => InteriorService.getInterior(id),
})

/**
 * Query a single interior by id
 *
 * @param id interior id to query
 * @param interval if poll, what should be the interval
 * @returns
 */
export function useQueryInterior(id?: string, interval?: number, skip = false) {
  return useQuery({
    ...queryInterior(id!),
    enabled: !skip,
    ...(!!interval && { refetchInterval: interval }),
  })
}

/**
 *
 * @param
 * @returns
 */
export function useMutateInterior({
  onSuccess,
}: Pick<MutationOptions<InteriorType, unknown, InteriorType, unknown>, 'onSuccess'>) {
  return useMutation({ mutationFn: (interior: InteriorType) => InteriorService.createInterior(interior), onSuccess })
}
