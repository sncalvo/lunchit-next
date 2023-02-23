import type { NextPage } from "next";
import MenuForm from "../../../components/organisms/MenuForm";

const NewMenu: NextPage = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-12 bg-base-300 px-4 py-16">
      <MenuForm />
    </div>
  );
};

export default NewMenu;
