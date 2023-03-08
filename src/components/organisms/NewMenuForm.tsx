import { createFormSchema, createSchema } from "../../schemas/menu";
import Button from "../atoms/Button";
import Form from "../atoms/Form";

import { api } from "../../utils/api";

import FormInput from "../molecules/FormInput";
import MenuVariantsFormFields from "./MenuVariantsFormFields";
import { useState } from "react";
import NewCategoryModal from "./NewCategoryModal";
import { useRouter } from "next/router";
import type * as z from "zod";
import useUploadImage from "../../utils/useUploadImage";

const NewMenuForm: React.FC = () => {
  const utils = api.useContext();
  const router = useRouter();
  const { mutate, isLoading } = api.menus.create.useMutation({
    onSuccess: async () => {
      await utils.menus.invalidate();

      await router.replace("/providers/menus");
    },
  });
  const { mutateAsync: imageMutation } =
    api.image.createPresignedURL.useMutation();
  const uploadImage = useUploadImage(imageMutation);

  const onSubmit = async (data: z.infer<typeof createFormSchema>) => {
    const imagesUploads = data.menuVariants.createMany.data.map(uploadImage);

    await Promise.all(imagesUploads);

    mutate(createSchema.parse(data));
  };

  const [newCategoryModalOpen, setNewCategoryModalOpen] = useState(false);

  return (
    <>
      <Form onSubmit={(data) => void onSubmit(data)} schema={createFormSchema}>
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
