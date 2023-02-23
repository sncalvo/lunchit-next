import type { HTMLInputTypeAttribute } from "react";
import { useFormContext } from "react-hook-form";
import Input from "../atoms/Input";

type Props = {
  name: string;
  label: string;
  type: HTMLInputTypeAttribute;
};

function FormInput({ name, label, type }: Props) {
  const methods = useFormContext();

  const error = methods.formState.errors[name];

  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text">Enter {label}</span>
      </label>
      <div className="input-group">
        <span>{label}</span>
        <Input name={name} type={type} />
      </div>
      {error && <p className="text-error">{error.message?.toString()}</p>}
    </div>
  );
}

export default FormInput;
