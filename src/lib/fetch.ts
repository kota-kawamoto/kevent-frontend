'use server'
// バックエンドのURL
const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL

// フェッチオプション
interface FetchOptions extends RequestInit {
  params?: Record<string, string>
}

// バックエンドにリクエストを送信
export const fetchApi = async (
  endpoint: string,
  options: FetchOptions = {}
) => {
  // 第一引数：GETのクエリ用
  // 第二引数：POSTのメソッド/ヘッダー/ボディ用
  const { params, ...restOptions } = options

  // URL作成
  let url = `${BASE_URL}${endpoint}`

  // クッキーから認証トークンを取得
  const getAuthTokenFromCookie = (): string | null => {
    // SSRでは実行されないためチェック
    // ※クッキーはクライアントでしか取得できない
    if (typeof window === 'undefined') return null
    // windowはクライアントコンポーネントにしか存在しないもののため利用不可。クッキーはサーバでもNextなら取れる

    if (typeof window === 'undefined') return null
    // auth_tokenの値を取得(;が出てくるまでの文字列を取得)
    const matches = document.cookie.match(/auth_token=([^;]+)/)
    return matches ? matches[1] : null
  }

  const authToken = getAuthTokenFromCookie()

  // デフォルトのオプションを設定
  const defaultOptions: RequestInit = {
    headers: {
      'X-Requested-With': 'XMLHttpRequest', // ajaxリクエストを送信するためのヘッダー
      'Content-Type': 'application/json', // ボディの形式
      // 認証トークンがあればBearerトークンを設定
      ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
    },
  }

  // オプションをマージ（ユーザー指定形式優先）
  const mergedOptions = {
    ...defaultOptions,
    ...restOptions,
    headers: {
      ...defaultOptions.headers,
      ...restOptions.headers,
    },
  }

  // バックエンドにリクエストを送信
  const response = await fetch(url, mergedOptions)

  // レスポンスがJSONでない場合のエラーハンドリング
  const contentType = response.headers.get('content-type')
  if (contentType && contentType.includes('application/json')) {
    const data = await response.json()
    if (!response.ok) {
      throw { response: { data } }
    }
    return { data }
  }

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  return response
}

export default fetchApi
