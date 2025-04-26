import { get } from '@/lib/api'

interface Group {
  id: string
  group_name: string
}

export async function getGroups(): Promise<Group[]> {
  return await get('/api/groups')
}
