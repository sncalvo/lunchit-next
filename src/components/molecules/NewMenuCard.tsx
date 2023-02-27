import { PlusCircleIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import Link from "next/link";

const NewMenuCard: React.FC = () => {
  return (
    <Link href="/providers/menus/new">
      <div
        className={clsx(
          "card flex w-full items-center justify-center bg-base-100 text-center",
          "h-full shadow-xl transition-all hover:bg-base-200"
        )}
      >
        <PlusCircleIcon className="text-primary-500 h-24 w-24" />
      </div>
    </Link>
  );
};

export default NewMenuCard;
