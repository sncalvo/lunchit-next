import { type NextPage } from "next";
import Head from "next/head";
import { api } from "../utils/api";

import ProviderCard from "../components/molecules/ProviderCard";

const Home: NextPage = () => {
  // Request Providers
  const { data: providers, isLoading } = api.providers.getAll.useQuery();

  return (
    <>
      <Head>
        <title>LunchIt</title>
        <meta name="description" content="Order your food in no time!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex flex-col items-center justify-center gap-12 bg-base-300 px-4 py-16">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {isLoading
            ? Array(6)
                .fill(0)
                .map((_, i) => <ProviderCard key={i} />)
            : providers?.map((provider) => (
                <ProviderCard key={provider.id} provider={provider} />
              ))}
        </div>
      </div>
    </>
  );
};

export default Home;
