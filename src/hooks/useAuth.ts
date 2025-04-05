'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import api from '@/lib/axios'

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
  // ユーザー情報を管理
  const [user, setUser] = useState<User | null>(null)
  // エラーを管理
  const [error, setError] = useState<string | null>(null)

  // リクエストのあったユーザー情報取得
  // const getUser = async () => {
  //   try {
  //     const response = await api.get('/api/getLoginUserInfo')
  //     console.log(response.data)
  //     setUser(response.data.user)
  //   } catch (error) {
  //     setUser(null)
  //     console.log(error)
  //     // ログインページ以外でのみリダイレクト
  //     if (window.location.pathname !== '/login') {
  //       router.push('/login')
  //     }
  //   }
  // }

  // CSRFトークンを取得
  // これを実行しないとsanctumはセッションベースの認証を許可しない
  const getCsrfToken = async () => {
    try {
      await api.get('/sanctum/csrf-cookie')
    } catch (error) {
      console.error('CSRF token error:', error)
    }
  }

  // ログイン処理
  const login = async (data: LoginData) => {
    setError(null)
    try {
      await getCsrfToken()
      const response = await api.post('/api/login', data)
      console.log(response.data)
      setUser(response.data.user)
      router.push('/users')
    } catch (error: any) {
      setError(error.response?.data?.message || 'ログインに失敗しました')
      throw error
    }
  }

  // ログアウト
  const logout = async () => {
    setError(null)
    try {
      await api.post('/api/logout')
      setUser(null)
      router.push('/login')
    } catch (error: any) {
      setError(error.response?.data?.message || 'ログアウトに失敗しました')
      throw error
    }
  }

  // // 初期化時にユーザー情報を取得
  // useEffect(() => {
  //   // ログインページでは認証チェックをスキップ
  //   if (window.location.pathname === '/login') {
  //     return
  //   }
  //   getUser()
  // }, [])

  return {
    user,
    error,
    login,
    logout,
  }
}
