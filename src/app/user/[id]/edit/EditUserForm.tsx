"use client";

import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface User {
  id: string;
  name: string;
  login_id: string;
  group_id: string;
  group_name: string;
}

interface Group {
  group_id: string;
  group_name: string;
}

interface EditUserFormProps {
  user: User;
  groups: Group[];
}

interface ValidationErrors {
  errors: {
    [key: string]: string[];
  };
}

// ユーザー編集画面のフォーム
export function EditUserForm({ user, groups }: EditUserFormProps) {
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/${user.id}`, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.get('name'),
          login_id: formData.get('login_id'),
          group_id: formData.get('group_id'),
          group_name: formData.get('group_name'),
        }),
      });

      if (!response.ok) {
        const errorData: ValidationErrors = await response.json();
        if (errorData.errors) {
          // バリデーションエラーメッセージを整形して表示
          const errorMessages = Object.values(errorData.errors)
            .flat()
            .join('\n');
          alert(errorMessages);
        } else {
          throw new Error(`HTTP error status: ${response.status}`);
        }
        return;
      }

      router.push(`/user/${user.id}`);
    } catch (e) {
      console.error('Error updating user:', e);
      alert('ユーザ情報の更新に失敗しました');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="bg-white shadow rounded-lg overflow-hidden p-6 space-y-4 max-w-2xl mx-auto">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            氏名
          </label>
          <input
            type="text"
            id="name"
            name="name"
            defaultValue={user.name}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="login_id" className="block text-sm font-medium text-gray-700">
            ログインID
          </label>
          <input
            type="text"
            id="login_id"
            name="login_id"
            defaultValue={user.login_id}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="group_id" className="block text-sm font-medium text-gray-700">
            所属グループ
          </label>
          <select
            id="group_id"
            name="group_id"
            /* 初期値はuserから取得を行う */
            defaultValue={user.group_id}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white py-2 pl-3 pr-10 text-gray-900 cursor-pointer"
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
        <Link href={`/user/${user.id}`}>
          <Button type="button" className="bg-gray-200 text-gray-800">
            キャンセル
          </Button>
        </Link>
        <Button type="submit" className="bg-blue-500 text-white">
          保存
        </Button>
      </div>
    </form>
  );
}