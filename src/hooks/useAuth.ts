'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import fetchApi from '@/lib/fetch'

interface User {
  id: number
  user_name: string
  login_id: string
}

interface LoginData {
  login_id: string
  password: string
}

export const useAuth = () => {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [error, setError] = useState<string | null>(null)

  // CSRFトークンを生成・返却→トークンベースの場合は不要
  // createTokenで発行されるBearerTokenを使用するためCSRF保護もクッキー処理も不要になる

  // ログイン処理
  // サーバコンポーネントにした方が楽。切り分けてインポート。

  // ログアウト
  // クッキーからトークンを削除した方がいいセキュリティの観点から
  // サーバコンポーネントに切り分けた方が楽
  const logout = async () => {
    setError(null)
    try {
      await fetchApi('/api/logout', {
        method: 'POST',
      })
      setUser(null)
      router.push('/login')
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || 'ログアウトに失敗しました'
      setError(errorMessage)
      throw new Error(errorMessage)
    }
  }

  return {
    user,
    error,
    logout,
  }
}
