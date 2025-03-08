"use client";

import { Button } from "@/components/ui/button";
import { deleteUser } from './actions';
import { useState } from 'react';

interface DeleteButtonProps {
  userId: string;
}

export function DeleteButton({ userId }: DeleteButtonProps) {
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async () => {
    if (!confirm('本当に削除しますか？')) {
      return;
    }

    try {
      await deleteUser(userId);
    } catch (e) {
      setError(e instanceof Error ? e.message : '削除に失敗しました');
    }
  };

  return (
    <>
      {error && (
        <div className="text-red-600 text-sm">{error}</div>
      )}
      <Button onClick={handleDelete} className="bg-red-500 text-white">
        削除
      </Button>
    </>
  );
}
