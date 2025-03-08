"use client";

import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { userSchema, type UserFormData } from './schema';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

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
  const {register, handleSubmit, formState : { errors } } = useForm<UserFormData>({
    resolver: yupResolver(userSchema),
    defaultValues: {
      name: user.name,
      login_id: user.login_id,
      group_id: user.group_id,
    }
  });

  const onSubmit = async (data: UserFormData) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${user.id}`, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData: ValidationErrors = await response.json();
        if (errorData.errors) {
          const errorMessages = Object.values(errorData.errors)
            .flat()
            .join('\n');
          alert(errorMessages);
        } else {
          throw new Error(`HTTP error status: ${response.status}`);
        }
        return;
      }

      router.push(`/users/${user.id}`);
    } catch (e) {
      console.error('Error updating user:', e);
      alert('ユーザ情報の更新に失敗しました');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="bg-white shadow rounded-lg overflow-hidden p-6 space-y-4 max-w-2xl mx-auto">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            氏名
          </label>
          <input
            {...register('name')}
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="login_id" className="block text-sm font-medium text-gray-700">
            ログインID
          </label>
          <input
            {...register('login_id')}
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.login_id && (
            <p className="mt-1 text-sm text-red-600">{errors.login_id.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="group_id" className="block text-sm font-medium text-gray-700">
            所属グループ
          </label>
          <select
            {...register('group_id')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white py-2 pl-3 pr-10 text-gray-900 cursor-pointer"
          >
            <option value="">グループを選択してください</option>
            {groups.map((group) => (
              <option key={group.group_id} value={group.group_id}>
                {group.group_name}
              </option>
            ))}
          </select>
          {errors.group_id && (
            <p className="mt-1 text-sm text-red-600">{errors.group_id.message}</p>
          )}
        </div>
      </div>

      <div className="flex space-x-4 mt-6 max-w-2xl mx-auto">
        <Link href={`/users/${user.id}`}>
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