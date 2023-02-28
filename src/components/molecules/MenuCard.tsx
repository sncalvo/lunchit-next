import Image from "next/image";
import type { Menu } from "@prisma/client";

import FoodDefault from "../../../public/images/food-default.webp";
import Link from "next/link";
import { useSession } from "next-auth/react";

type Props = {
  menu?: Menu;
};

const MenuCard: React.FC<Props> = ({ menu }) => {
  const session = useSession();

  if (!menu) {
    return (
      <div className="card bg-base-100 shadow-xl">
        <figure>
          <div className="h-[300px] w-full animate-pulse bg-base-200"></div>
        </figure>
        <div className="card-body">
          <div className="card-title h-6 w-3/4 animate-pulse bg-base-200"></div>
          <div className="h-4 w-3/4 animate-pulse bg-base-200"></div>

          <div className="card-actions justify-end">
            <div className="btn-primary btn h-8 w-24 animate-pulse bg-base-200"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card w-full bg-base-100 shadow-xl">
      <figure>
        <Image
          src={menu.image || FoodDefault}
          alt={menu.name}
          width={320}
          height={300}
          placeholder="blur"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{menu.name}</h2>
        <p>{menu.date.toLocaleDateString()}</p>
        <div className="card-actions justify-end">
          <Link
            href={
              session.data?.user?.company?.type === "PROVIDER"
                ? `/providers/menus/${menu.id}/edit`
                : `/providers/menus/${menu.id}`
            }
          >
            Edit
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MenuCard;
