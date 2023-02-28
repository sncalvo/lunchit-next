import type { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import Script from "next/script";
import { clientEnv } from "../../env/schema.mjs";
import paymentSchema from "../../schemas/payment";
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

  const paymentMutation = api.payments.pay.useMutation();

  const renderCardPaymentBrick = async (bricksBuilder: any) => {
    const settings = {
      initialization: {
        amount: menuVariant?.price ?? 100,
      },
      payer: {
        email: "test@mail.com",
      },
      customization: {
        visual: {
          style: {
            theme: "default",
          },
        },
      },
      callbacks: {
        onReady: () => {
          /*
          Callback llamado cuando Brick esté listo.
          Aquí puedes ocultar loadings de su sitio, por ejemplo.
        */
        },
        onSubmit: (cardFormData: unknown) => {
          const paymentData = paymentSchema.parse(cardFormData);
          return paymentMutation.mutateAsync(paymentData);
        },
        onError: (error: any) => {
          // callback llamado para todos los casos de error de Brick
          console.error(error);
        },
      },
    };
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    (window as any).cardPaymentBrickController = await bricksBuilder.create(
      "cardPayment",
      "cardPaymentBrick_container",
      settings
    );
  };

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
      <Script
        src="https://sdk.mercadopago.com/js/v2"
        onLoad={() => {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
          const mp = new MercadoPago(
            clientEnv.NEXT_PUBLIC_MERCADO_PAGO_PUBLIC
          ) as unknown as any;
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
          const bricksBuilder = mp.bricks();

          void renderCardPaymentBrick(bricksBuilder);
        }}
      />
      <div id="cardPaymentBrick_container"></div>
    </div>
  );
};

export default Purchase;
