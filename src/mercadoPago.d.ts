type BrickCreationOptions = {
  initialization: {
    amount: number;
  };
  payer: {
    email: string;
  };
  customization: {
    visual: {
      style: {
        theme: string;
      };
    };
  };
  callbacks: {
    onReady: () => void;
    onSubmit: (cardFormData: unknown) => Promise<void>;
    onError: (error: unknown) => void;
  };
};

declare class BrickBuilder {
  public create(
    type: string,
    containerId: string,
    options: BrickCreationOptions
  ): Promise<unknown>;
}

declare class MercadoPago {
  publicToken: string | undefined;

  constructor(publicToken: string | undefined);

  public bricks(): BrickBuilder;
}
