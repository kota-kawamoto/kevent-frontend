"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';

interface DeleteButtonProps {
  userId: string;
}

export function DeleteButton({ userId }: DeleteButtonProps) {
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm('このユーザーを削除しますか？')) {
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/${userId}/delete`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error status: ${response.status}`);
      }

      router.push('/user')
    } catch (e) {
      console.error('Error deleting user:', e);
      alert('ユーザーの削除に失敗');
    }
  };

  return (
    <Button onClick={handleDelete} className="bg-red-500 text-white">
      削除
    </Button>
  );
} 