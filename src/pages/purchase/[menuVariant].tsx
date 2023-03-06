import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import type { Session } from "next-auth";
import { useRouter } from "next/router";
import Script from "next/script";
import { useState } from "react";
import PurchaseResultModal from "../../components/molecules/PaymentResultModal";
import { clientEnv } from "../../env/schema.mjs";
import paymentSchema from "../../schemas/payment";
import { api } from "../../utils/api";
import { checkLoggedIn } from "../../utils/checkAuthentication";

type User = Required<Pick<Session, "user">>;

export const getServerSideProps: GetServerSideProps<User> = async (context) => {
  const checkAuthentication = await checkLoggedIn(context);

  return checkAuthentication;
};

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

const Purchase: NextPage<Props> = ({ user }) => {
  const router = useRouter();

  const [paymentDone, setPaymentDone] = useState(false);
  const [paymentError, setPaymentError] = useState(false);

  const { menuVariant: menuVariantId } = router.query;

  const { data: menuVariant, isLoading } = api.menuVariants.get.useQuery(
    {
      id: menuVariantId as string,
    },
    { enabled: menuVariantId !== undefined }
  );

  const [loadingMercadoPago, setLoadingMercadoPago] = useState(true);

  const paymentMutation = api.payments.pay.useMutation();

  const renderCardPaymentBrick = async (bricksBuilder: BrickBuilder) => {
    const settings = {
      initialization: {
        amount: menuVariant?.price ?? 100,
        payer: {
          email: user.email,
        },
      },
      callbacks: {
        onReady: () => {
          setLoadingMercadoPago(false);
        },
        onSubmit: async (cardFormData: unknown) => {
          if (!menuVariant?.id) {
            return;
          }

          const paymentData = paymentSchema
            .omit({ menuVariantId: true })
            .parse(cardFormData);

          const response = await paymentMutation.mutateAsync({
            ...paymentData,
            menuVariantId: menuVariant.id,
          });

          setPaymentDone(true);
          if (response.status !== "approved") {
            setPaymentError(true);
          }
        },
        onError: (error: unknown) => {
          console.error(error);
        },
      },
    };

    await bricksBuilder.create(
      "cardPayment",
      "cardPaymentBrick_container",
      settings
    );
  };

  return (
    <div className="flex flex-col gap-5 p-5">
      {isLoading || loadingMercadoPago ? (
        <div>Loading...</div>
      ) : (
        <div className="card bg-base-100">
          <div className="card-body">
            <div className="card-title">
              <h1>{menuVariant?.name}</h1>
            </div>
            <h2>{menuVariant?.price}</h2>
            <p>{menuVariant?.description}</p>
          </div>
        </div>
      )}
      <Script
        src="https://sdk.mercadopago.com/js/v2"
        onLoad={() => {
          const mp = new MercadoPago(clientEnv.NEXT_PUBLIC_MERCADO_PAGO_PUBLIC);
          const bricksBuilder = mp.bricks();

          void renderCardPaymentBrick(bricksBuilder);
        }}
      />
      <div id="cardPaymentBrick_container"></div>

      <PurchaseResultModal
        open={paymentDone}
        error={paymentError}
        onClose={() => {
          void router.replace("/");
        }}
      />
    </div>
  );
};

export default Purchase;
