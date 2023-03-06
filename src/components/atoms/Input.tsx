import type { HTMLInputTypeAttribute } from "react";
import type {
  FieldError,
  FieldErrorsImpl,
  FieldValues,
  FormState,
  Merge,
  Path,
  UseFormRegister,
} from "react-hook-form";

import { useFormContext } from "react-hook-form";
import clsx from "clsx";

type InputProps<T extends FieldValues> = {
  name: Path<T>;
  type: HTMLInputTypeAttribute;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
  register: UseFormRegister<T>;
  formState: FormState<T>;
};

function NestedInput<T extends FieldValues>({
  name,
  register,
  type,
  error,
}: InputProps<T>) {
  return (
    <input
      type={type}
      {...register(name)}
      className={clsx("input-bordered input w-full", {
        "input-error": error !== undefined,
        "input-info": error === undefined,
      })}
    />
  );
}

type InputProp = {
  name: string;
  type: HTMLInputTypeAttribute;
};

// TODO: add memo
function Input({ name, type }: InputProp) {
  const methods = useFormContext();

  const error = methods.formState.errors[name];

  return <NestedInput {...methods} type={type} name={name} error={error} />;
}

export default Input;
