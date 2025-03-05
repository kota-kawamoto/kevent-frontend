'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export async function createUser(formData: FormData) {
  try {
    const response = await fetch(`${process.env.API_URL}/api/user`, {
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
      if (response.status === 422) {
        const errorMessage = Object.values(data.errors)
          .flat()
          .join('\n');
        throw new Error(errorMessage);
      }
      throw new Error(data.message || `エラーが発生しました (${response.status})`);
    }

    revalidatePath('/user');
    redirect('/user');
  } catch (error) {
    console.error('作成エラー:', error);
    throw error instanceof Error ? error : new Error('ユーザーの作成に失敗しました');
  }
}
