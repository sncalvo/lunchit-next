import { useSession } from "next-auth/react";
import Link from "next/link";
import UserAvatar from "../atoms/UserAvatar";
import { signOut, signIn } from "next-auth/react";
import Button from "../atoms/Button";

const UserItem: React.FC = () => {
  const session = useSession();

  if (!session.data?.user) {
    return (
      <Button variant="ghost" onClick={() => void signIn()}>
        Sign in
      </Button>
    );
  }

  return (
    <div className="dropdown-end dropdown">
      <label tabIndex={0} className="btn-ghost btn h-16 w-16">
        <UserAvatar
          alt="User Avatar"
          src={session.data?.user?.image}
          size="xs"
        />
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content menu rounded-box mt-4 w-52 bg-base-100 p-2 shadow"
      >
        <Link href="/profile" className="btn-ghost btn">
          Profile
        </Link>
        <Link href="/settings" className="btn-ghost btn">
          Settings
        </Link>
        <Button variant="secondary" onClick={() => void signOut()}>
          Sign out
        </Button>
      </ul>
    </div>
  );
};
export default UserItem;
