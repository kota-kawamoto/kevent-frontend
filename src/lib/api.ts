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

// セッション情報をサーバに送信できてない、クッキーには入っているが
// クッキーの中の認証用トークンを取り出してAPI送信時にヘッダーに入れることをしないといけない
export async function get(path: string) {
  const response = await fetch(`${process.env.API_URL}${path}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
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

export async function post(path: string, body: object) {
  const response = await fetch(`${process.env.API_URL}${path}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
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

export async function put(path: string, body: object) {
  const response = await fetch(`${process.env.API_URL}${path}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
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

export async function del(path: string) {
  const response = await fetch(`${process.env.API_URL}${path}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
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
