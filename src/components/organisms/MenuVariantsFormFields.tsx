import { useFieldArray, useFormContext } from "react-hook-form";
import type { z } from "zod";
import type { updateSchema } from "../../schemas/menu";
import Button from "../atoms/Button";
import MenuVariantInputs from "../molecules/MenuVariantInputs";

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

  return (
    <div className="flex flex-col items-end">
      <ol>
        {createFields.map((field, index) => (
          <MenuVariantInputs
            key={field.id}
            onRemove={() => removeCreate(index)}
            name={`menuVariants.createMany.data.${index}`}
          />
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
          <MenuVariantInputs
            key={field.id}
            onRemove={() => {
              removeUpdate(index);
              const id = getValues(`menuVariants.updateMany.${index}.where.id`);
              const name = getValues(
                `menuVariants.updateMany.${index}.data.name`
              );
              appendDelete({ id, name });
            }}
            name={`menuVariants.updateMany.${index}.data`}
          />
        ))}
      </ol>
    </div>
  );
}

export default MenuVariantsFormFields;
