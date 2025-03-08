'use server'

import { redirect } from 'next/navigation';

export async function deleteUser(userId: string) {
  try {
    const response = await fetch(`${process.env.API_URL}/api/users/${userId}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`削除に失敗しました (${response.status})`);
    }

    redirect('/users');
  } catch (error) {
    console.error('ユーザーの削除に失敗しました:', error);
    throw new Error('ユーザーの削除に失敗しました');
  }
}
