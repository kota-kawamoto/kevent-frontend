'use server'

import { del } from '@/lib/api'

export async function deleteUser(userId: string) {
  try {
    await del(`/api/users/${userId}`)
  } catch (error) {
    console.error('ユーザーの削除に失敗しました:', error)
    throw new Error('ユーザーの削除に失敗しました')
  }
}
