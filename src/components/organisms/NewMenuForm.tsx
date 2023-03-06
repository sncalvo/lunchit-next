import { createSchema } from "../../schemas/menu";
import Button from "../atoms/Button";
import Form from "../atoms/Form";

import { api } from "../../utils/api";

import FormInput from "../molecules/FormInput";
import MenuVariantsFormFields from "./MenuVariantsFormFields";
import { useState } from "react";
import NewCategoryModal from "./NewCategoryModal";
import { useRouter } from "next/router";
import * as z from "zod";

const formSchema = createSchema.merge(
  z.object({
    menuVariants: z.object({
      createMany: z.object({
        data: z.array(
          z.object({
            image: z.any().refine((file) => file instanceof File, {
              message: "Must be a file",
            }),
            ...createSchema.shape.menuVariants.shape.createMany.shape.data
              .element.shape,
          })
        ),
      }),
    }),
  })
);

const NewMenuForm: React.FC = () => {
  const utils = api.useContext();
  const router = useRouter();
  const { mutate, isLoading } = api.menus.create.useMutation({
    onSuccess: async () => {
      await utils.menus.invalidate();

      await router.replace("/providers/menus");
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);

    // Upload images to s3

    // mutate(createSchema.parse(data));
  };

  const [newCategoryModalOpen, setNewCategoryModalOpen] = useState(false);

  return (
    <>
      <Form onSubmit={onSubmit} schema={formSchema}>
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2>Create a new menu</h2>

            <div className="flex flex-col gap-3 md:flex-row">
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
              Create
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

export default NewMenuForm;
