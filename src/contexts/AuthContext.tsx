'use client'

import { createContext, useContext, ReactNode } from 'react'
import { useAuth } from '@/hooks/useAuth'

// 認証状態をサイト全体で共有するためにコンテキストを作成
const AuthContext = createContext<ReturnType<typeof useAuth> | undefined>(
  undefined
)

// 認証状態をサイト全体で共有するためにプロバイダーを作成
export function AuthProvider({ children }: { children: ReactNode }) {
  // useAuthを使用し認証状態を取得
  const auth = useAuth()
  // AuthContext.Providerに認証状態を渡しアプリ全体で共有
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}

// 認証情報を取得するためのカスタムフック
export function useAuthContext() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider')
  }
  return context
}
