'use server'

import { cookies } from 'next/headers'

// フェッチオプション
interface FetchOptions extends RequestInit {
  params?: Record<string, string>
}

// バックエンドにリクエストを送信
export const fetchApi = async (
  endpoint: string,
  options: FetchOptions = {}
) => {
  try {
    // 第一引数：GETのクエリ用
    // 第二引数：POSTのメソッド/ヘッダー/ボディ用
    const { params, ...restOptions } = options

    // URLを引数から設定
    let url = endpoint

    // クッキーから認証トークンを取得
    const cookieStore = await cookies()
    const authToken = cookieStore.get('auth_token')?.value

    // デフォルトのオプションを設定
    const defaultOptions: RequestInit = {
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json',
        ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
      },
    }

    // オプションをマージ
    const mergedOptions = {
      ...defaultOptions,
      ...restOptions,
      headers: {
        ...defaultOptions.headers,
        ...restOptions.headers,
      },
    }

    // バックエンドにリクエストを送信
    const response = await fetch(url, mergedOptions).catch((err) => {
      console.error('Fetch error:', err)
      throw err
    })

    // レスポンスがJSONでない場合のエラーハンドリング
    const contentType = response.headers.get('content-type')
    if (contentType && contentType.includes('application/json')) {
      const data = await response.json()
      if (!response.ok) {
        console.error('API Error:', data)
        throw { response: { data } }
      }
      return { data }
    }

    if (!response.ok) {
      const data = await response.json()
      console.error(data)
      throw new Error(data)
    }

    return response
  } catch (error) {
    console.error('Fetch error:', error)
    throw error
  }
}

export default fetchApi
