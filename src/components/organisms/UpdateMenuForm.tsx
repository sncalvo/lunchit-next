import { updateSchema } from "../../schemas/menu";
import Button from "../atoms/Button";
import Form from "../atoms/Form";

import { api } from "../../utils/api";

import FormInput from "../molecules/FormInput";
import MenuVariantsFormFields from "./MenuVariantsFormFields";
import { useMemo, useState } from "react";
import NewCategoryModal from "./NewCategoryModal";
import { useRouter } from "next/router";

const UpdateMenuForm: React.FC = () => {
  const utils = api.useContext();
  const router = useRouter();
  const { data: menu } = api.menus.get.useQuery(
    { menuId: router.query.id as string },
    { enabled: !!router.query.id }
  );
  const { mutate, isLoading } = api.menus.update.useMutation({
    onSuccess: async () => {
      await utils.menus.invalidate();

      await router.replace("/providers/menus");
    },
  });

  const menuDefaultValues = useMemo(() => {
    if (!menu) return undefined;

    const defaultValues = {
      ...menu,
      date: new Date(menu.date),
      menuVariants: {
        updateMany: menu.menuVariants.map((menuVariant) => ({
          where: { id: menuVariant.id },
          data: {
            ...menuVariant,
          },
        })),
        createMany: { data: [] },
        deleteMany: [],
      },
    };

    const values = updateSchema.parse(defaultValues);

    return {
      ...values,
      date: values.date.toISOString().split("T")[0] as unknown as Date,
    };
  }, [menu]);

  const [newCategoryModalOpen, setNewCategoryModalOpen] = useState(false);

  if (!menuDefaultValues) return null;

  return (
    <>
      <Form
        onSubmit={mutate}
        schema={updateSchema}
        defaultValues={menuDefaultValues}
      >
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2>Update menu {menuDefaultValues.name}</h2>

            <div className="flex gap-3">
              <div>
                <FormInput name="name" label="name" type="text" />

                <FormInput name="date" label="date" type="date" />
              </div>

              <div className="rounded-xl bg-base-200 p-4">
                <h3>Menu variants</h3>
                <MenuVariantsFormFields />
              </div>
            </div>

            <Button type="submit" loading={isLoading}>
              Update
            </Button>

            <Button type="button" onClick={() => setNewCategoryModalOpen(true)}>
              New Category
            </Button>
          </div>
        </div>
      </Form>
      <NewCategoryModal
        open={newCategoryModalOpen}
        setNewCategoryModalOpen={setNewCategoryModalOpen}
      />
    </>
  );
};

export default UpdateMenuForm;
