import { EditUserForm } from './EditUserForm'
import { cookies } from 'next/headers'

interface EditUserPageProps {
  params: Promise<{ id: string }>
}

interface User {
  id: string
  name: string
  login_id: string
  group_id: string
  group_name: string
}

interface Group {
  id: string
  group_name: string
}

// ユーザー編集画面
export default async function EditUserPage({ params }: EditUserPageProps) {
  const { id } = await params
  // クッキーから認証トークンを取得
  const cookieStore = cookies()
  const authToken = (await cookieStore).get('auth_token')?.value

  // ユーザー情報の取得
  const response = await fetch(`${process.env.API_URL}/api/users/${id}/edit`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      XRequestedWith: 'XMLHttpRequest',
      ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
    },
  })

  if (!response.ok) {
    throw new Error(`HTTP error status: ${response.status}`)
  }

  // レスポンスデータを取得
  const data = await response.json()
  const user: User = data.user
  const groups: Group[] = data.groups.map((group: any) => ({
    id: group.id.toString(),
    group_name: group.name,
  }))

  console.log('User:', user)
  console.log('Groups:', groups)

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">ユーザー編集</h1>
      <EditUserForm user={user} groups={groups} />
    </div>
  )
}
