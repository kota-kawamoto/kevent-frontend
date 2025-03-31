'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-800 mb-4">500</h1>
        <h2 className="text-2xl font-semibold text-gray-600 mb-8">
          サーバーエラーが発生しました
        </h2>
        <p className="text-gray-500 mb-8">
          サーバーで問題が発生しました。
          <br />
          時間をおいて再度お試しください。
        </p>
        <div className="space-x-4">
          <Button
            onClick={reset}
            className="bg-blue-500 text-white hover:bg-blue-700"
          >
            再試行
          </Button>
          <Link href="/">
            <Button className="bg-gray-500 text-white hover:bg-gray-700">
              ホームに戻る
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
