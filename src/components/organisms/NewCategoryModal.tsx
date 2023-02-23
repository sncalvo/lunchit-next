import clsx from "clsx";

import { createSchema } from "../../schemas/category";
import { api } from "../../utils/api";
import Button from "../atoms/Button";
import Form from "../atoms/Form";
import FormInput from "../molecules/FormInput";

type Props = {
  open?: boolean;
  setNewCategoryModalOpen?: (open: boolean) => void;
};

function NewCategoryModal({ open = false, setNewCategoryModalOpen }: Props) {
  const utils = api.useContext();
  const { mutate, isLoading } = api.categories.create.useMutation({
    onSuccess: async () => {
      await utils.categories.invalidate();
    },
  });

  return (
    <div
      className={clsx(
        "modal modal-bottom sm:modal-middle",
        open && "modal-open"
      )}
    >
      <div className={clsx("modal-box")}>
        <Form onSubmit={mutate} schema={createSchema}>
          <FormInput name="name" label="name" type="text" />
          <Button type="submit" loading={isLoading}>
            Create
          </Button>
        </Form>
        <Button type="button" onClick={() => setNewCategoryModalOpen?.(false)}>
          Close
        </Button>
      </div>
    </div>
  );
}

export default NewCategoryModal;
