import { zodResolver } from "@hookform/resolvers/zod";
import type * as z from "zod";

import type { DeepPartial, FieldValues } from "react-hook-form";
import type { BaseSyntheticEvent } from "react";
import { useForm, FormProvider } from "react-hook-form";

import { DevTool } from "@hookform/devtools";

type Props<T> = {
  onSubmit: (data: T) => void;
  schema: z.ZodSchema<T>;
  children: React.ReactNode;
  defaultValues?: DeepPartial<T> | ((payload?: unknown) => Promise<T>);
};

function Form<T extends FieldValues>({
  onSubmit,
  schema,
  children,
  defaultValues,
}: Props<T>) {
  const resolver = zodResolver(schema);

  const methods = useForm<T>({
    resolver,
    defaultValues,
  });

  console.log({ errors: methods.formState.errors });

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={(e: BaseSyntheticEvent) => {
          methods
            .handleSubmit(onSubmit)(e)
            .catch((err) => {
              console.error(err);
            });
        }}
      >
        {children}
      </form>

      <DevTool control={methods.control} />
    </FormProvider>
  );
}

export default Form;
