'use server'

import { cookies } from 'next/headers'
import { post } from '@/lib/api'

interface LoginData {
  login_id: string
  password: string
}

export async function loginAction(data: LoginData) {
  try {
    const response = await post('/api/login', data)

    // サーバー側でセッションクッキーを設定
    if (response.token) {
      const cookieStore = await cookies()
      await cookieStore.set({
        name: 'auth_token',
        value: response.token,
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        maxAge: 60 * 60, // 1時間
      })
    }

    return response
  } catch (err: any) {
    console.error('Login error:', err)
    throw new Error(err.message || 'ログインに失敗しました')
  }
}
