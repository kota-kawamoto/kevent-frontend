"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Header() {
  const pathname = usePathname();

  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-4">
        <ul className="flex space-x-8">
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
        </ul>
      </nav>
    </header>
  );
} 