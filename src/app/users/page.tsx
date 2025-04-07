import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { DeleteButton } from './[id]/DeleteButton'
import { get, ApiError } from '@/lib/api'
import { notFound } from 'next/navigation'

interface User {
  id: string
  user_name: string
  login_id: string
  group: {
    group_name: string
  }
}

interface PaginatedResponse {
  current_page: number
  data: User[]
  last_page: number
  total: number
  per_page: number
  next_page_url: string | null
  prev_page_url: string | null
}

interface PageProps {
  searchParams: {
    page?: string
  }
}

export default async function UserListPage({ searchParams }: PageProps) {
  const currentPage = Number(searchParams.page) || 1

  try {
    const result: PaginatedResponse = await get(`/api/users?page=${currentPage}`)

    if (!result || !Array.isArray(result.data)) {
      throw new Error('Invalid API response format')
    }

    const Pagination = () => {
      return (
        <div className="flex justify-center space-x-2 mt-4">
          {result.prev_page_url && (
            <Link
              href={`/users?page=${currentPage - 1}`}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              前へ
            </Link>
          )}

          {Array.from({ length: result.last_page }, function (_, i) {
            return i + 1
          }).map((page) => (
            <Link
              key={page}
              href={`/users?page=${page}`}
              className={`px-4 py-2 rounded ${
                currentPage === page
                  ? 'bg-blue-700 text-white'
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              {page}
            </Link>
          ))}

          {result.next_page_url && (
            <Link
              href={`/users?page=${currentPage + 1}`}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              次へ
            </Link>
          )}
        </div>
      )
    }

    return (
      <div className="container mx-auto p-3">
        <table className="min-w-full bg-white shadow-md rounded mt-6">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                ID
              </th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                氏名
              </th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                所属グループ
              </th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                詳細
              </th>
            </tr>
          </thead>
          <tbody>
            {result.data.map((user) => (
              <tr key={user.id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4">{user.id}</td>
                <td className="py-3 px-4">{user.user_name}</td>
                <td className="py-3 px-4">{user.group.group_name}</td>
                <td className="py-3 px-4 space-x-2">
                  <Link href={`/users/${user.id}`}>
                    <Button className="bg-blue-500 text-white hover:bg-blue-800">
                      詳細
                    </Button>
                  </Link>
                  <Link href={`/users/${user.id}/edit`}>
                    <Button className="bg-green-500 text-white hover:bg-green-700">
                      編集
                    </Button>
                  </Link>
                  <DeleteButton userId={user.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Link href="/users/create" className="mt-6 block">
          <Button className="bg-blue-500 text-white hover:bg-blue-800">
            新規ユーザ登録
          </Button>
        </Link>
        <Pagination />
      </div>
    )
  } catch (error) {
    if (error instanceof ApiError) {
      if (error.status === 404) {
        console.error('APIエラー:', error.message)
        console.error('APIエラー:', error.status)
        console.error('APIエラー:', error.errors)
        notFound()
      }
      throw error // 404以外のエラーはthrow
    }
    throw error // ApiError以外のエラーはthrow
  }
}
