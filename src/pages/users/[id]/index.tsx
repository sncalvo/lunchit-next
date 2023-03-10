import { useRouter } from "next/router";
import { useEffect } from "react";
import UserCard from "../../../components/molecules/UserCard";
import { api } from "../../../utils/api";

function User() {
  const router = useRouter();
  const { id } = router.query;

  const { data: user, error } = api.users.get.useQuery(
    { id: id as string },
    {
      enabled: id !== undefined,
    }
  );

  useEffect(() => {
    if (error?.data?.code === "UNAUTHORIZED") {
      router.push("/").catch(console.error);
    }
  }, [error, router]);

  return (
    <div className="flex flex-col items-center justify-center gap-12 bg-base-300 px-4 py-16">
      <UserCard user={user} />
    </div>
  );
}

export default User;
