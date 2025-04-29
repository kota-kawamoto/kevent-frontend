'use client'

import { useRouter } from 'next/navigation'
import { loginAction } from '@/app/actions/login'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { loginSchema, type LoginFormData } from '@/app/login/schema'

export default function LoginPage() {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
  })

  const onSubmit = async (data: LoginFormData) => {
    try {
      const result = await loginAction(data)
      if (result?.token) {
        router.push('/')
      } else {
        throw new Error('ログインに失敗しました')
      }
    } catch (error: any) {
      console.error('Login error:', error)
      throw new Error('ログインに失敗しました')
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

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4 rounded-md">
            <div>
              <Label htmlFor="login_id">ログインID</Label>
              <Input
                id="login_id"
                type="text"
                required
                {...register('login_id')}
                className="mt-1"
              />
              {errors.login_id && (
                <p className="text-red-500 text-sm">
                  {errors.login_id.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="password">パスワード</Label>
              <Input
                id="password"
                type="password"
                required
                {...register('password')}
                className="mt-1"
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

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
