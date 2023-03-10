import { api } from "../../utils/api";

import Table from "../../components/atoms/Table";
import Link from "next/link";

function UsersPage() {
  const { data, isLoading } = api.users.getAll.useQuery();

  return (
    <div className="flex flex-col items-center justify-center gap-12 bg-base-300 px-4 py-16">
      <div className="grid grid-cols-1">
        <div className="overflow-x-auto">
          <Table
            rows={
              data?.map((data) => ({
                ...data,
                view: (
                  <Link
                    href={`/users/${data.id}`}
                    className="btn-primary rounded px-4 py-3"
                  >
                    View
                  </Link>
                ),
              })) ?? []
            }
            columns={[
              ["id", "ID"],
              ["name", "Name"],
              ["email", "Email"],
              ["role", "Role"],
              ["view", "View"],
            ]}
            isLoading={isLoading}
          />
        </div>

        <div className="mt-5">
          <Link href="/users/new" className="btn-primary rounded px-4 py-3">
            Create User
          </Link>
        </div>
      </div>
    </div>
  );
}

export default UsersPage;
