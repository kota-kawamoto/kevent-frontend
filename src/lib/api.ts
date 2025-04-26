// use serverになるかどうか呼び出し元により変わる
// .tsxは何も書かなかったらサーバコンポーネントになる
// .tsファイルは何かから呼ばれることしかないから、呼び出し元に依存する
import { cookies } from 'next/headers'
export class ApiError extends Error {
  constructor(
    message: string, // エラーメッセージ
    public status: number, // ステータスコード
    public errors?: Record<string, string[]> // エラー内容詳細（バリデーション等）
  ) {
    super(message) // エラーメッセージを親クラスに渡す
    this.name = 'ApiError' // エラー名を設定→page.tsxでインスタンス生成エラー名を取得
  }
}

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
    }

    throw new ApiError(
      data?.message || 'API Error',
      response.status,
      data?.errors
    )
  }

  return data
}

export const get = (path: string) => request('GET', path)
export const post = (path: string, body: object) => request('POST', path, body)
export const put = (path: string, body: object) => request('PUT', path, body)
export const del = (path: string) => request('DELETE', path)
