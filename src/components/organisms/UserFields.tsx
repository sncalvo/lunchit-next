import Button from "../atoms/Button";
import FormInput from "../molecules/FormInput";
import FormSelect from "../molecules/SelectInput";

function UserFields() {
  return (
    <>
      <FormInput name="name" label="Name" type="text" />
      <FormInput name="email" label="Email" type="email" />
      <FormSelect
        name="role"
        label="Role"
        options={[
          {
            value: "ADMIN",
            label: "Admin",
          },
          {
            value: "EMPLOYEE",
            label: "Employee",
          },
        ]}
      />

      <Button type="submit">Submit</Button>
    </>
  );
}

export default UserFields;
