import type { NextPage } from "next";
import { useRouter } from "next/router";
import { api } from "../../utils/api";

import Image from "next/image";
import FoodDefault from "../../../public/images/food-default.webp";
import Button from "../../components/atoms/Button";
import Link from "next/link";

const ShowProvider: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data: provider, isLoading } = api.providers.get.useQuery(
    {
      id: id as string,
    },
    { enabled: id !== undefined }
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!provider) {
    return <div>Provider not found</div>;
  }

  return (
    <div className="p-5">
      <div className="card card-side bg-base-100 shadow-xl">
        <figure>
          <Image
            src={provider.image || FoodDefault}
            alt={provider.name}
            width={320}
            height={300}
          />
        </figure>
        <div className="card-body">
          <h1 className="text-xl">{provider.name}</h1>
          <p>{provider.description}</p>
        </div>
      </div>
      <div className="mt-5">
        <h1 className="text-xl">Menus</h1>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {provider.menus.map((menu) => (
            <div key={menu.id} className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <div className="flex justify-between">
                  <h2 className="card-title">{menu.name}</h2>
                  <h3>{menu.date.toLocaleDateString()}</h3>
                </div>

                <div>
                  {menu.menuVariants.map((menuVariant) => (
                    <>
                      <div
                        className="grid h-16 grid-cols-8 gap-4"
                        key={menuVariant.id}
                      >
                        <div className="relative col-span-1 overflow-hidden">
                          <Image
                            src={menuVariant.image || FoodDefault}
                            alt={menuVariant.name}
                            fill
                            className="rounded object-cover"
                          />
                        </div>
                        <h3 className="col-span-3">{menuVariant.name}</h3>
                        <p className="col-span-2">{menuVariant.description}</p>
                        <p className="col-span-1">{menuVariant.price}</p>

                        <div className="col-span-1">
                          <Link href={`/purchase/${menuVariant.id}`}>
                            <Button>Buy</Button>
                          </Link>
                        </div>
                      </div>

                      <div
                        className="my-2 h-px bg-base-300"
                        key={`${menuVariant.id}_separator`}
                      ></div>
                    </>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShowProvider;
