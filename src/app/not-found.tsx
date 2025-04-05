import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-600 mb-8">
          ページが見つかりませんでした
        </h2>
        <p className="text-gray-500 mb-8">
          お探しのページは存在しないか、移動または削除された可能性があります。
        </p>
        <Link href="/">
          <Button className="bg-blue-500 text-white hover:bg-blue-700">
            ホームに戻る
          </Button>
        </Link>
      </div>
    </div>
  )
}
