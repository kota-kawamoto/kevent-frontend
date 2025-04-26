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

// GET
export async function get(path: string) {
  const cookieStore = await cookies()
  const authToken = cookieStore.get('auth_token')?.value
  const response = await fetch(`${process.env.API_URL}${path}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
    },
    cache: 'no-store',
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    if (response.status === 404) {
      throw new ApiError(error.message || 'リソースが見つかりません', 404)
    }
    throw new ApiError(
      error.message || `APIエラー (${response.status})`,
      response.status,
      error.errors
    )
  }

  return response.json()
}

// POST
export async function post(path: string, body: object) {
  const cookieStore = await cookies()
  const authToken = cookieStore.get('auth_token')?.value

  const response = await fetch(`${process.env.API_URL}${path}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
    },
    body: JSON.stringify(body),
    cache: 'no-store',
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    if (response.status === 404) {
      throw new ApiError(error.message || 'リソースが見つかりません', 404)
    }
    throw new ApiError(
      error.message || `APIエラー (${response.status})`,
      response.status,
      error.errors
    )
  }

  return response.json()
}

// PUT
export async function put(path: string, body: object) {
  const cookieStore = await cookies()
  const authToken = cookieStore.get('auth_token')?.value

  const response = await fetch(`${process.env.API_URL}${path}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
    },
    body: JSON.stringify(body),
    cache: 'no-store',
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    if (response.status === 404) {
      throw new ApiError(error.message || 'リソースが見つかりません', 404)
    }
    throw new ApiError(
      error.message || `APIエラー (${response.status})`,
      response.status,
      error.errors
    )
  }

  return response.json()
}

// DELETE
export async function del(path: string) {
  const cookieStore = await cookies()
  const authToken = cookieStore.get('auth_token')?.value

  const response = await fetch(`${process.env.API_URL}${path}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
    },
    cache: 'no-store',
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    if (response.status === 404) {
      throw new ApiError(error.message || 'リソースが見つかりません', 404)
    }
    throw new ApiError(
      error.message || `APIエラー (${response.status})`,
      response.status,
      error.errors
    )
  }

  return response.json()
}
