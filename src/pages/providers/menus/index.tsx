import type { NextPage } from "next";
import { useRouter } from "next/router";
import MenuCard from "../../../components/molecules/MenuCard";
import NewMenuCard from "../../../components/molecules/NewMenuCard";

import { api } from "../../../utils/api";

const Menus: NextPage = () => {
  const router = useRouter();
  const { providerId } = router.query;
  const { data: menus, isLoading } = api.menus.getAll.useQuery({
    companyId: providerId as string | undefined,
  });

  return (
    <div className="flex flex-col items-center justify-center gap-12 bg-base-300 px-4 py-16">
      <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <NewMenuCard />

        {isLoading
          ? Array(6)
              .fill(0)
              .map((_, i) => <MenuCard key={i} />)
          : menus?.map((menu) => <MenuCard key={menu.id} menu={menu} />)}
      </div>
    </div>
  );
};

export default Menus;
