import type { NextPage } from "next";
import NewMenuForm from "../../../components/organisms/NewMenuForm";

const NewMenu: NextPage = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-12 bg-base-300 px-4 py-16">
      <NewMenuForm />
    </div>
  );
};

export default NewMenu;
