import Image from "next/image";
import type { Company } from "@prisma/client";

import FoodDefault from "../../../public/images/food-default.webp";
import Link from "next/link";

type Props = {
  provider?: Company;
};

const ProviderCard: React.FC<Props> = ({ provider }) => {
  if (!provider) {
    return (
      <div className="card w-80 bg-base-100 shadow-xl">
        <figure>
          <div className="h-[300px] w-full animate-pulse bg-base-200"></div>
        </figure>
        <div className="card-body">
          <div className="card-title h-6 w-3/4 animate-pulse bg-base-200"></div>
          <div className="h-4 w-3/4 animate-pulse bg-base-200"></div>

          <div className="card-actions justify-end">
            <div className="btn-primary btn h-8 w-24 animate-pulse bg-base-200"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card w-80 bg-base-100 shadow-xl">
      <figure>
        <Image
          src={provider.image || FoodDefault}
          alt={provider.name}
          width={320}
          height={300}
          placeholder="blur"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{provider.name}</h2>
        <p>{provider.description}</p>
        <div className="card-actions justify-end">
          <Link href={`/providers/${provider.id}`}>
            <button className="btn-primary btn">View</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProviderCard;
