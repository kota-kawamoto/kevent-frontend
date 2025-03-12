import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { DeleteButton } from './DeleteButton';

interface UserDetailPageProps {
  params: Promise<{ id: string }>;
}

interface User {
  id: string;
  name: string;
  login_id: string;
  group_name: string;
}

export default async function UserDetailPage({ params }: UserDetailPageProps) {
  const { id } = await params;
    const response = await fetch(`${process.env.API_URL}/api/users/${id}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        }
      });

  
    if (!response.ok) {
      throw new Error(`HTTP error status: ${response.status}`);
    }

  const user: User = await response.json();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">ユーザー詳細</h1>
      {user && (
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <table className="min-w-full">
            <tbody>
              <tr className="border-b">
                <th className="text-left bg-gray-50 px-6 py-3 text-gray-600">ユーザーID</th>
                <td className="px-6 py-3">{user.id}</td>
              </tr>
              <tr className="border-b">
                <th className="text-left bg-gray-50 px-6 py-3 text-gray-600">氏名</th>
                <td className="px-6 py-3">{user.name}</td>
              </tr>
              <tr className="border-b">
                <th className="text-left bg-gray-50 px-6 py-3 text-gray-600">ログインID</th>
                <td className="px-6 py-3">{user.login_id}</td>
              </tr>
              <tr>
                <th className="text-left bg-gray-50 px-6 py-3 text-gray-600">所属グループ</th>
                <td className="px-6 py-3">{user.group_name}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
      <div className="flex space-x-4 mt-6">
        <Link href="/users">
          <Button className="bg-gray-200 text-gray-800">一覧に戻る</Button>
        </Link>
        <Link href={`/users/${user?.id}/edit`}>
          <Button className="bg-blue-500 text-white">編集</Button>
        </Link>
        <DeleteButton userId={user.id} />
      </div>
    </div>
  );
}
