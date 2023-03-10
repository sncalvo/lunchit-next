import { useRouter } from "next/router";
import Form from "../../components/atoms/Form";
import UserFields from "../../components/organisms/UserFields";
import { createSchema } from "../../schemas/user";
import { api } from "../../utils/api";

function NewUser() {
  const utils = api.useContext();
  const router = useRouter();

  const { mutate } = api.users.create.useMutation({
    onSuccess: async () => {
      await utils.users.invalidate();

      await router.replace("/users");
    },
  });

  return (
    <div>
      <Form schema={createSchema} onSubmit={mutate}>
        <UserFields />
      </Form>
    </div>
  );
}

export default NewUser;
