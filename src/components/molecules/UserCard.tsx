import type { User } from "@prisma/client";
import Image from "next/image";
import Card from "../atoms/Card";

import Me from "../../../public/images/me.png";
import Button from "../atoms/Button";
import Link from "next/link";
import { useRouter } from "next/router";
import { api } from "../../utils/api";

type Props = {
  user?: User;
};

function UserCard({ user }: Props) {
  const router = useRouter();

  const utils = api.useContext();

  const { mutate } = api.users.delete.useMutation({
    onSuccess: async () => {
      await utils.users.invalidate();
      await router.replace("/users");
    },
  });

  return (
    <Card pulse={user === undefined}>
      <div className="avatar self-center py-5">
        <div className="w-36 rounded-full bg-white ring ring-primary ring-offset-2 ring-offset-base-100">
          <Image
            src={user?.image || Me}
            width={144}
            height={144}
            alt="user avatar"
          />
        </div>
      </div>

      <div className="card-body">
        <div className="card-title">
          <h2>{user?.name}</h2>
          <h3>{user?.email}</h3>
        </div>

        <p>{user?.role === "ADMIN" ? "Admin" : "Employee"}</p>

        <div className="card-actions justify-end">
          <Link href={user?.id ? `/users/${user?.id}/edit` : ""}>
            <Button variant="ghost">Edit</Button>
          </Link>

          <Button
            variant="error"
            onClick={() => user?.id && mutate({ id: user?.id })}
          >
            Delete
          </Button>
        </div>
      </div>
    </Card>
  );
}

export default UserCard;
