"use client";

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";

interface UserDetailPageProps {
  params: Promise<{ id: string }>;
}

interface User {
  id: string;
  name: string;
  login_id: string;
  group_name: string;
}

export default function UserDetailPage({ params }: UserDetailPageProps) {
  const [user, setUser] = useState<User | null>(null);
  const [resolvedParams, setResolvedParams] = useState<{ id: string } | null>(null);

  // ユーザデータを取得する関数
  const fetchUser = useCallback(async () => {
    if (!resolvedParams) return;

    try {
      const response = await fetch(`http://localhost:8070/api/user/${resolvedParams.id}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error status: ${response.status}`);
      }

      const data = await response.json();

      setUser({
        id: data.user_id,
        name: data.user_name, 
        login_id: data.login_id,
        group_name: data.group_name
      });
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }, [resolvedParams]);

  // ユーザIDを取得
  useEffect(() => {
    const resolveParams = async () => {
      const resolved = await params;
      setResolvedParams(resolved);
    };

    resolveParams();
  }, [params]);

  // ユーザデータを取得
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

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
        <Link href="/user">
          <Button className="bg-gray-200 text-gray-800">一覧に戻る</Button>
        </Link>
        <Link href={`/user/${user?.id}/edit`}>
          <Button className="bg-blue-500 text-white">編集</Button>
        </Link>
        {/* <Link href='#' onClick={deleteUser}> */}
          <Button className="bg-red-500 text-white">削除</Button>
        {/* </Link> */}
      </div>
    </div>
  );
}
