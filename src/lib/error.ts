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
