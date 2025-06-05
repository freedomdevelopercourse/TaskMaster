import { queryOptions } from '@tanstack/react-query'
import supabase from '@/api/Supabase'

export const UserQueryOptions = queryOptions({
  queryKey: ['user'],
  async queryFn() {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    return user
  },
})
