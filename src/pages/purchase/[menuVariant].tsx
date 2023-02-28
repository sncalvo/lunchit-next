import type { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { api } from "../../utils/api";
import { checkLoggedIn } from "../../utils/checkAuthentication";

// In server side props, check user logged in to allow access to this page
export const getServerSideProps: GetServerSideProps = async (context) => {
  const checkAuthentication = await checkLoggedIn(context);

  return checkAuthentication;
};

const Purchase: NextPage = () => {
  const router = useRouter();
  const { menuVariant: menuVariantId } = router.query;

  const { data: menuVariant, isLoading } = api.menuVariants.get.useQuery(
    {
      id: menuVariantId as string,
    },
    { enabled: menuVariantId !== undefined }
  );

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <h1>{menuVariant?.name}</h1>
          <h2>{menuVariant?.price}</h2>
          <p>{menuVariant?.description}</p>
        </div>
      )}
    </div>
  );
};

export default Purchase;
