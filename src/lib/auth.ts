'use client'

import { createContext, useContext, useState, useEffect } from 'react'
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

interface AuthContextType {
  user: User | null
  error: string | null
  login: (data: LoginData) => Promise<void>
  logout: () => Promise<void>
  getUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [error, setError] = useState<string | null>(null)

  const getUser = async () => {
    try {
      const response = await fetchApi('/api/user')
      if ('data' in response) {
        setUser(response.data)
      }
    } catch (error) {
      console.error('ユーザー取得失敗:', error)
      setUser(null)
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('auth_token')
    if (token) {
      getUser()
    }
  }, [])

  const login = async (data: LoginData) => {
    setError(null)
    try {
      const response = await fetchApi('/api/login', {
        method: 'POST',
        body: JSON.stringify(data),
      })

      if ('data' in response) {
        const token = response.data.token
        if (token) {
          localStorage.setItem('auth_token', token) // トークンを保存
        }

        setUser(response.data.user)
        router.push('/users') // ログイン後のリダイレクト
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || 'ログインに失敗しました'
      setError(errorMessage)
    }
  }

  const logout = async () => {
    try {
      const token = localStorage.getItem('auth_token')
      await fetchApi('/api/logout', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      localStorage.removeItem('auth_token')
      setUser(null)
      router.push('/login')
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || 'ログアウトに失敗しました'
      setError(errorMessage)
    }
  }

export const useAuthContext = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuthContext must be used within AuthProvider')
  return context
}
