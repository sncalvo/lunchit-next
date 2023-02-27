import type { AppType } from "next/app";
import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import { api } from "../utils/api";
import NavigationLayout from "../components/layouts/Navigation";

import "../styles/globals.css";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <NavigationLayout>
        <Component {...pageProps} />
      </NavigationLayout>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
