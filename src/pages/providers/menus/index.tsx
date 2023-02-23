import type { NextPage } from "next";
import NewMenuCard from "../../../components/molecules/NewMenuCard";

const Menus: NextPage = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-12 bg-base-300 px-4 py-16">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <NewMenuCard />
      </div>
    </div>
  );
};

export default Menus;
