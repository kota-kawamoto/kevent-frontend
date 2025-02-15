"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface User {
  user_id: string;
  user_name: string;
}

export default function UserListPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8070/api/users", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setUsers(data || []);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  // ユーザーリストをレンダリングする関数
  const renderUserList = () => {
    if (users.length > 0) {
      return users.map((user) => (
        <ul key={user.user_id} className="mb-2">
          <Link href={`/user/${user.user_id}`} className="text-blue-700 hover:underline">
            {user.user_name}
          </Link>
        </ul>
      ));
    } else if (!loading) {
      return <div>ユーザーが見つかりませんでした。</div>;
    }
  };

  // ユーザーを取得
  useEffect(() => {
    fetchUsers();
  }, []);

  // useEffect(() => {
  //   fetchUsers(); // 初回のデータ取得
  
  //   const intervalId = setInterval(() => {
  //     fetchUsers(); // 10秒ごとにデータを取得
  //   }, 10000);
  
  //   // クリーンアップ関数
  //   return () => clearInterval(intervalId);
  // }, []); // ここが依存配列

  return (
    <div className="container mx-auto p-3">
      <h1 className="text-3xl font-bold mb-6">ユーザー一覧</h1>
      {loading && <div>Loading...</div>}
      <ul className="list-disc pl-5">
        {renderUserList()}
      </ul>
    </div>
  );
}
