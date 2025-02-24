import Link from "next/link";

interface User {
  user_id: string;
  user_name: string;
}

export default async function UserListPage() {

      const response = await fetch(`${process.env.API_URL}/api/users`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const users : User[] = await response.json();

  return (
    <div className="container mx-auto p-3">
      <h1 className="text-3xl font-bold mb-6">ユーザー一覧</h1>
      <ul className="list-disc pl-5">
        {users.map((user) => (
          <li key={user.user_id}>
            <Link href={`/user/${user.user_id}`} className="text-blue-700 hover:underline">
              {user.user_name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
