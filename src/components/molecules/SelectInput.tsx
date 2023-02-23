import Select from "../atoms/Select";

type Props = {
  name: string;
  label: string;
  options: { value: string; label: string }[];
};

function FormSelect({ name, label, options }: Props) {
  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text">Enter {label}</span>
      </label>
      <div className="input-group">
        <span>{label}</span>
        <Select name={name} options={options} label={label} />
      </div>
    </div>
  );
}

export default FormSelect;
