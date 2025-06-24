import { EditUserForm } from './EditUserForm'
import { get } from '@/lib/api'
import { getGroups } from '../../lib/getGroups'

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
  name: string
}

// ユーザー編集画面
export default async function EditUserPage({ params }: EditUserPageProps) {
  const { id } = await params

  // ユーザー情報の取得
  const user: User = await get(`/api/users/${id}`)
  // グループ一覧の取得
  const groups: Group[] = await getGroups()

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">ユーザー編集</h1>
      <EditUserForm user={user} groups={groups} />
    </div>
  )
}
