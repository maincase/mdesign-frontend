import { InteriorType } from '@/state/interior/InteriorState'
import { MutationOptions, useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query'
import InteriorService from '../services/interior'

/**
 *
 */
export const queryInteriors = (skip = 0, limit = 20) => ({
  queryKey: ['interiors', skip / limit],
  queryFn: ({ pageParam }: { pageParam: { skip: number; limit: number } }) =>
    InteriorService.getInteriors(pageParam.skip, pageParam.limit),
  initialPageParam: { skip, limit },
  getNextPageParam: (lastPage: InteriorType[], pages: InteriorType[][]) => ({
    skip: pages.length * (lastPage?.length ?? 0),
    limit,
  }),
})

/**
 * Query all interiors in the database with pagination
 *
 * @param skip
 * @param limit
 * @param initialData
 * @returns
 */
export function useQueryInteriors(initialData: InteriorType[] = [], skip = 0, limit = 20) {
  return useInfiniteQuery({
    ...queryInteriors(skip, limit),
    ...(initialData.length > 0 ? { initialData: { pages: [initialData], pageParams: [{ skip, limit }] } } : {}),
  })
}

/**
 *
 * @param id
 * @returns
 */
export const queryInterior = (id: string) => ({
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
    enabled: !skip,
    ...queryInterior(id!),
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
  return useMutation({
    mutationFn: (interior: InteriorType & { captchaToken: string }) => InteriorService.createInterior(interior),
    onSuccess,
  })
}
