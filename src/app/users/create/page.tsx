import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getGroups } from '../lib/getGroups';

// 新規ユーザー登録画面
export default async function CreateUserPage() {
  // グループ一覧を取得
  const groups = await getGroups();

  async function createUser(formData: FormData) {
    'use server';

    try {
      const response = await fetch(`${process.env.API_URL}/api/users`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_name: formData.get('user_name'),
          login_id: formData.get('login_id'),
          password: formData.get('password'),
          group_id: formData.get('group_id'),
          type_id: formData.get('type_id'),
        }),
        cache: 'no-store',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `エラーが発生しました (${response.status})`);
      }
      redirect('/users');

    } catch (error) {
      console.error('作成エラー:', error);
      throw error instanceof Error ? error : new Error('ユーザーの作成に失敗しました');
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">新規ユーザ登録</h1>
      <form action={createUser} className="space-y-4 max-w-2xl mx-auto">
        <div className="bg-white shadow rounded-lg overflow-hidden p-6 space-y-4">
          <input
            type="hidden"
            name="type_id"
            value="1"
          />
          <div>
            <label className="block text-sm font-medium text-gray-700">
              氏名
            </label>
            <input
              type="text"
              name="user_name"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              ログインID
            </label>
            <input
              type="text"
              name="login_id"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              パスワード
            </label>
            <input
              type="password"
              name="password"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              所属グループ
            </label>
            <select
              name="group_id"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white py-2 pl-3 pr-10 text-gray-900 cursor-pointer"
              required
            >
              {groups.map((group) => (
                <option key={group.group_id} value={group.group_id}>
                  {group.group_name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex space-x-4 mt-6 max-w-2xl mx-auto">
          <Link href="/users">
            <Button type="button" className="bg-gray-200 text-gray-800">
              キャンセル
            </Button>
          </Link>
          <Button type="submit" className="bg-blue-500 text-white">
            登録
          </Button>
        </div>
      </form>
    </div>
  );
} 