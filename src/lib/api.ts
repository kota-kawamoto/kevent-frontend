'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { ApiError } from '@/lib/error'

// API共通化
type Method = 'GET' | 'POST' | 'PUT' | 'DELETE'

async function request(method: Method, path: string, body?: object) {
  // クッキーから認証トークンを取得
  const cookieStore = cookies()
  const authToken = (await cookieStore).get('auth_token')?.value

  // デフォルトのヘッダーを設定
  const headers: HeadersInit = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    XRequestedWith: 'XMLHttpRequest',
    ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
  }

  // リクエストオプションを設定
  const options: RequestInit = {
    method,
    headers,
    cache: 'no-store',
    ...(body ? { body: JSON.stringify(body) } : {}),
  }

  // バックエンドにリクエストを送信
  const response = await fetch(`${process.env.API_URL}${path}`, options)

  // レスポンス取得
  let data: any = null
  const contentType = response.headers.get('content-type')

  if (contentType && contentType.includes('application/json')) {
    data = await response.json()
  }

  // エラーハンドリング
  if (!response.ok) {
    if (response.status === 404) {
      throw new ApiError(
        data?.message || 'Not Found',
        response.status,
        data?.errors
      )
    } else if (response.status === 401) {
      redirect('/login')
    }

    throw new ApiError(
      data?.message || 'API Error',
      response.status,
      data?.errors
    )
  }

  return data
}

export const get = async (path: string) => request('GET', path)
export const post = async (path: string, body: object) =>
  request('POST', path, body)
export const put = async (path: string, body: object) =>
  request('PUT', path, body)
export const del = async (path: string) => request('DELETE', path)
