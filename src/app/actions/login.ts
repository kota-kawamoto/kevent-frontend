'use server'

import { cookies } from 'next/headers'
import { fetchApi } from '@/lib/fetch'

interface LoginData {
  login_id: string
  password: string
}

export async function loginAction(data: LoginData) {
  try {
    const response = await fetchApi(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/login`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        },
        body: JSON.stringify(data),
      }
    )

    if ('data' in response) {
      // サーバー側でセッションクッキーを設定
      if (response.data?.token) {
        const cookieStore = await cookies()
        await cookieStore.set({
          name: 'auth_token',
          value: response.data.token,
          httpOnly: true,
          sameSite: 'lax',
          secure: process.env.NODE_ENV === 'production',
          path: '/',
          maxAge: 60 * 60, // 1時間
        })
      }
      return response.data
    }

    throw new Error(response.data || 'ログインに失敗しました')
  } catch (err: any) {
    console.error('Login error:', err)
    throw new Error(err.message || 'ログインに失敗しました')
  }
}
