import { useRouter } from "next/router";
import Breadcrumbs from "../atoms/Breadcrumbs";

const NavbarBreadcrumbs: React.FC = () => {
  const router = useRouter();
  const { pathname } = router;
  // TODO: Change ids to slugs
  const routesList = pathname
    .split("/")
    .filter((route) => route)
    .map((route) => {
      const display = route.charAt(0).toUpperCase() + route.slice(1);
      return { route, display };
    });

  return (
    <div className="navbar-breadcrumbs">
      <Breadcrumbs routesList={routesList} />
    </div>
  );
};

export default NavbarBreadcrumbs;
