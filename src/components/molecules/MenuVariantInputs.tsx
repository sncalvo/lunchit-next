import { api } from "../../utils/api";
import Button from "../atoms/Button";
import FormInput from "./FormInput";
import SelectInput from "./SelectInput";

type Props = {
  name: string;
  onRemove: () => void;
};

function MenuVariantInputs({ name, onRemove }: Props) {
  const { data: categories, isLoading: categoriesLoading } =
    api.categories.getAll.useQuery();

  return (
    <li className="grid grid-cols-2 items-end gap-2 p-2">
      <FormInput label="name" name={`${name}.name`} type="text" />
      <FormInput label="description" name={`${name}.description`} type="text" />
      <FormInput label="price" name={`${name}.price`} type="number" />
      {!categoriesLoading && categories !== undefined && (
        <SelectInput
          label="category"
          name={`${name}.categoryId`}
          options={categories.map((category) => ({
            value: category.id,
            label: category.name,
          }))}
        />
      )}
      <Button type="button" onClick={onRemove} variant="warning">
        Remove
      </Button>
    </li>
  );
}

export default MenuVariantInputs;
