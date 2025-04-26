'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { logout } from '@/app/actions/logout'

export function Header() {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await logout()
      router.push('/login')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-4">
        <ul className="flex space-x-8 items-center">
          <li>
            <Link
              href="/users"
              className={`inline-block py-4 ${
                pathname.startsWith('/users')
                  ? 'text-blue-600 border-b-4 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              ユーザー一覧
            </Link>
          </li>
          <li>
            <Link
              href="/event"
              className={`inline-block py-4 ${
                pathname.startsWith('/event')
                  ? 'text-blue-600 border-b-4 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              イベント一覧
            </Link>
          </li>
          <li className="ml-auto">
            <button
              onClick={handleLogout}
              className="text-gray-500 hover:text-gray-700 py-2 px-4 rounded-md hover:bg-gray-100"
            >
              ログアウト
            </button>
          </li>
        </ul>
      </nav>
    </header>
  )
}
