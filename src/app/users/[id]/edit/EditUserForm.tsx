'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { userSchema, type UserFormData } from './schema'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { updateUser } from './action'

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

interface EditUserFormProps {
  user: User
  groups: Group[]
}

interface ValidationErrors {
  errors: {
    [key: string]: string[]
  }
}

// ユーザー編集画面のフォーム
export function EditUserForm({ user, groups }: EditUserFormProps) {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: yupResolver(userSchema),
    defaultValues: {
      name: user.name,
      login_id: user.login_id,
      group_id: user.group_id,
    },
  })

  const onSubmit = async (data: UserFormData) => {
    try {
      await updateUser(user.id, data)
      router.push(`/users/${user.id}`)
    } catch (e) {
      console.error('Error updating user:', e)
      alert('ユーザ情報の更新に失敗しました')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="bg-white shadow rounded-lg overflow-hidden p-6 space-y-4 max-w-2xl mx-auto">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            氏名
          </label>
          <Input {...register('name')} />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="login_id"
            className="block text-sm font-medium text-gray-700"
          >
            ログインID
          </label>
          <Input {...register('login_id')} />
          {errors.login_id && (
            <p className="mt-1 text-sm text-red-600">
              {errors.login_id.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="group_id"
            className="block text-sm font-medium text-gray-700"
          >
            所属グループ
          </label>
          <Select
            name="group_id"
            onValueChange={(value) => setValue('group_id', value)}
            defaultValue={user.group_id.toString()}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="グループを選択してください" />
            </SelectTrigger>
            <SelectContent>
              {groups.map((group) => (
                <SelectItem key={group.id} value={group.id.toString()}>
                  {group.group_name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.group_id && (
            <p className="mt-1 text-sm text-red-600">
              {errors.group_id.message}
            </p>
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
  )
}
