'use client'

import { useState } from 'react'
import { useAuthContext } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function LoginPage() {
  const { login, error } = useAuthContext()
  const [login_id, setLoginId] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await login({ login_id, password })
    } catch (error) {
      console.error('Login error:', error)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md space-y-8 rounded-xl bg-white p-8 shadow">
        <div>
          <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900">
            ログイン
          </h2>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4 rounded-md">
            <div>
              <Label htmlFor="login_id">ログインID</Label>
              <Input
                id="login_id"
                name="login_id"
                type="text"
                required
                value={login_id}
                onChange={(e) => setLoginId(e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="password">パスワード</Label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1"
              />
            </div>
          </div>

          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          <div>
            <Button type="submit" className="w-full">
              ログイン
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
