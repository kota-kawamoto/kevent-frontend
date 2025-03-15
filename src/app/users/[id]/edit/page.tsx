import { EditUserForm } from './EditUserForm'

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
  group_id: string
  group_name: string
}

// ユーザー編集画面
export default async function EditUserPage({ params }: EditUserPageProps) {
  const { id } = await params

  // ユーザー情報の取得
  const response = await fetch(`${process.env.API_URL}/api/users/${id}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error(`HTTP error status: ${response.status}`)
  }

  // グループ一覧の取得
  const groupsResponse = await fetch(`${process.env.API_URL}/api/groups`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })

  if (!groupsResponse.ok) {
    throw new Error(`HTTP error status: ${groupsResponse.status}`)
  }

  // ユーザー情報
  const user: User = await response.json()
  // グループ一覧情報
  const groups: Group[] = await groupsResponse.json()

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">ユーザー編集</h1>
      <EditUserForm user={user} groups={groups} />
    </div>
  )
}
