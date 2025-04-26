'use server'

import { post } from '@/lib/api'

// ログアウト
export async function logout() {
  try {
    await post('/api/logout', {})
  } catch (error) {
    console.error('Logout error:', error)
    throw new Error('ログアウトに失敗しました')
  }
}
