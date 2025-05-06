'use server'

import { post } from '@/lib/api'
import { cookies } from 'next/headers'
// ログアウト
export async function logout() {
  try {
    await post('/api/logout', {})
    const cookieStore = await cookies()
    cookieStore.delete('auth_token')
  } catch (error) {
    console.error('Logout error:', error)
    throw new Error('ログアウトに失敗しました')
  }
}
