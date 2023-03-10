import { useRouter } from "next/router";
import Form from "../../../components/atoms/Form";
import UserFields from "../../../components/organisms/UserFields";
import { updateSchema } from "../../../schemas/user";
import { api } from "../../../utils/api";

function NewUser() {
  const utils = api.useContext();
  const router = useRouter();

  const { mutate } = api.users.update.useMutation({
    onSuccess: async () => {
      await utils.users.invalidate();

      await router.replace("/users");
    },
  });

  const { data: user } = api.users.get.useQuery(
    { id: router.query.id as string },
    { enabled: router.query.id !== undefined }
  );

  if (user === undefined) return null;

  return (
    <div>
      <Form schema={updateSchema} onSubmit={mutate} defaultValues={user}>
        <UserFields />
      </Form>
    </div>
  );
}

export default NewUser;
