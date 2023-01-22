import Link from "next/link";

type Route = { route: string; display: string };

type Props = {
  routesList: Route[];
};

const Breadcrumbs: React.FC<Props> = ({ routesList }) => {
  const buildRoute = (index: number) =>
    routesList
      .slice(0, index + 1)
      .map(({ route }) => route)
      .join("/");

  return (
    <div className="breadcrumbs text-sm">
      <ul>
        {routesList.slice(0, -1).map((route, index) => (
          <li key={`${route.route}${route.display}`}>
            <Link href={`/${buildRoute(index)}`}>{route.display}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Breadcrumbs;
