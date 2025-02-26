import Link from "next/link";
import { Button } from "@/components/ui/button";

interface User {
  user_id: string;
  user_name: string;
  login_id: string;
  group: {
    group_name: string;
  };
}

interface PaginatedResponse {
  current_page: number;
  data: User[];
  last_page: number;
  total: number;
  per_page: number;
  next_page_url: string | null;
  prev_page_url: string | null;
}

interface PageProps {
  searchParams: {
    page?: string;
  };
}

export default async function UserListPage({ searchParams }: PageProps) {
  const currentPage = Number(searchParams.page) || 1;

  const response = await fetch(
    `${process.env.API_URL}/api/users?page=${currentPage}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );

  const result: PaginatedResponse = await response.json();

  const Pagination = () => {
    return (
      <div className="flex justify-center space-x-2 mt-4">
        {result.prev_page_url && (
          <Link
            href={`/user?page=${currentPage - 1}`}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            前へ
          </Link>
        )}
        
        {Array.from({ length: result.last_page },
        function(_, i) {
          return i + 1;
        })
        .map((page) => (
          <Link
            key={page}
            href={`/user?page=${page}`}
            className={`px-4 py-2 rounded ${
              currentPage === page
                ? "bg-blue-700 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {page}
          </Link>
        ))}

        {result.next_page_url && (
          <Link
            href={`/user?page=${currentPage + 1}`}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            次へ
          </Link>
        )}
      </div>
    );
  };

  return (
    <div className="container mx-auto p-3">
      <h1 className="text-3xl font-bold mb-6">ユーザー一覧</h1>
      <table className="min-w-full bg-white shadow-md rounded">
        <thead>
          <tr className="bg-gray-100 border-b">
            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">ID</th>
            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">氏名</th>
            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">所属グループ</th>
            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">詳細</th>
          </tr>
        </thead>
        <tbody>
          {result.data.map((user) => (
            <tr key={user.user_id} className="border-b hover:bg-gray-50">
              <td className="py-3 px-4">{user.user_id}</td>
              <td className="py-3 px-4">{user.user_name}</td>
              <td className="py-3 px-4">{user.group.group_name}</td>
              <td className="py-3 px-4 space-x-2">
                <Link href={`/user/${user.user_id}`}>
                  <Button className="bg-blue-500 text-white hover:bg-blue-800">
                    詳細
                  </Button>
                </Link>
                <Link href={`/user/${user.user_id}/edit`}>
                  <Button className="bg-green-500 text-white hover:bg-green-700">
                    編集
                  </Button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination />
    </div>
  );
}
