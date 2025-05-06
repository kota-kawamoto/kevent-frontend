'use server'

import { put } from '@/lib/api'

export async function updateUser(id: string, data: any) {
  return put(`/api/users/${id}`, data)
}

