import { useFieldArray, useFormContext } from "react-hook-form";
import type { z } from "zod";
import type { updateSchema } from "../../schemas/menu";
import { api } from "../../utils/api";
import Button from "../atoms/Button";
import FormInput from "../molecules/FormInput";
import FormSelect from "../molecules/SelectInput";

type Schema = z.infer<typeof updateSchema>;

function MenuVariantsFormFields() {
  const {
    fields: createFields,
    append: appendCreate,
    remove: removeCreate,
  } = useFieldArray<Schema>({
    name: "menuVariants.createMany.data",
    keyName: "id",
  });

  const { fields: updateFields, remove: removeUpdate } = useFieldArray<Schema>({
    name: "menuVariants.updateMany",
    keyName: "id",
  });

  const { append: appendDelete } = useFieldArray<Schema>({
    name: "menuVariants.deleteMany",
    keyName: "id",
  });

  const { getValues } = useFormContext<Schema>();

  const { data: categories, isLoading: categoriesLoading } =
    api.categories.getAll.useQuery();

  return (
    <div className="flex flex-col items-end">
      <ol>
        {createFields.map((field, index) => (
          <li key={field.id} className="grid grid-cols-2 items-end gap-2 p-2">
            <FormInput
              label="name"
              name={`menuVariants.createMany.data.${index}.name`}
              type="text"
            />
            <FormInput
              label="description"
              name={`menuVariants.createMany.data.${index}.description`}
              type="text"
            />
            <FormInput
              label="price"
              name={`menuVariants.createMany.data.${index}.price`}
              type="number"
            />
            {!categoriesLoading && categories !== undefined && (
              <FormSelect
                label="category"
                name={`menuVariants.createMany.data.${index}.categoryId`}
                options={categories.map((category) => ({
                  value: category.id,
                  label: category.name,
                }))}
              />
            )}
            <Button
              type="button"
              onClick={() => removeCreate(index)}
              variant="warning"
            >
              Remove
            </Button>
          </li>
        ))}
      </ol>

      <Button
        type="button"
        onClick={() =>
          appendCreate({ name: "", price: 0, description: "", categoryId: "" })
        }
      >
        Append New
      </Button>

      <ol>
        {updateFields.map((field, index) => (
          <li key={field.id} className="grid grid-cols-2 items-end gap-2 p-2">
            <FormInput
              label="name"
              name={`menuVariants.updateMany.${index}.data.name`}
              type="text"
            />
            <FormInput
              label="description"
              name={`menuVariants.updateMany.${index}.data.description`}
              type="text"
            />
            <FormInput
              label="price"
              name={`menuVariants.updateMany.${index}.data.price`}
              type="number"
            />
            {!categoriesLoading &&
              categories !== undefined &&
              categories.length > 0 && (
                <FormSelect
                  label="category"
                  name={`menuVariants.updateMany.${index}.data.categoryId`}
                  options={categories.map((category) => ({
                    value: category.id,
                    label: category.name,
                  }))}
                />
              )}
            <Button
              type="button"
              onClick={() => {
                removeUpdate(index);
                const id = getValues(
                  `menuVariants.updateMany.${index}.where.id`
                );
                const name = getValues(
                  `menuVariants.updateMany.${index}.data.name`
                );
                appendDelete({ id, name });
              }}
              variant="warning"
            >
              Remove
            </Button>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default MenuVariantsFormFields;
