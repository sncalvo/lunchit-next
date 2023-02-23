import type {
  FieldValues,
  FormState,
  Path,
  UseFormRegister,
} from "react-hook-form";

import { memo } from "react";
import { useFormContext } from "react-hook-form";
import clsx from "clsx";

type SelectProps<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  options: { value: string; label: string }[];
  error: boolean;
  register: UseFormRegister<T>;
  formState: FormState<T>;
};

<select className="select-bordered select w-full max-w-xs">
  <option disabled selected>
    Who shot first?
  </option>
  <option>Han Solo</option>
  <option>Greedo</option>
</select>;

function NestedSelect<T extends FieldValues>({
  name,
  label,
  options,
  register,
  error,
  formState: { isDirty },
}: SelectProps<T>) {
  return (
    <select
      {...register(name)}
      className={clsx("select-bordered select-info select", {
        "input-error": error && isDirty,
      })}
    >
      <option disabled selected>
        {label}
      </option>
      {options.map((option) => (
        <option key={option.value + name} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

const MemodedNestedSelect = memo(
  NestedSelect,
  (prevProps, nextProps) =>
    prevProps.formState.isDirty === nextProps.formState.isDirty
);

type InputProp = {
  name: string;
  label: string;
  options: { value: string; label: string }[];
};

function Select({ name, label, options }: InputProp) {
  const methods = useFormContext();

  const error = methods.formState.errors[name];

  return (
    <MemodedNestedSelect
      {...methods}
      name={name}
      label={label}
      options={options}
      error={error !== undefined}
    />
  );
}

export default Select;
