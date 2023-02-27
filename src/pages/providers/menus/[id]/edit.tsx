import type { NextPage } from "next";
import UpdateMenuForm from "../../../../components/organisms/UpdateMenuForm";

const EditMenu: NextPage = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-12 bg-base-300 px-4 py-16">
      <UpdateMenuForm />
    </div>
  );
};

export default EditMenu;
