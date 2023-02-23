// import { useSession } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useMemo } from "react";
import Drawer, { DrawerMenu } from "../atoms/Drawer";
import NavbarBreadcrumbs from "../molecules/NavbarBreadcrumbs";
import UserItem from "../molecules/UserItem";

type Props = {
  children: React.ReactNode;
};

const NavigationLayout: React.FC<Props> = ({ children }) => {
  const session = useSession();

  const links = useMemo(() => {
    const company = session.data?.user?.company;
    // TODO: Use to determine editing orders and company info
    // const role = session.data?.user?.role;

    if (company?.type === "PROVIDER") {
      return [
        { href: "/", label: "Home" },
        { href: "/providers/menus", label: "Menus" },
      ];
    }

    return [{ href: "/", label: "Home" }];
  }, [session.data?.user?.company]);

  return (
    <DrawerMenu id="drawer" links={links}>
      <nav className="navbar flex-none bg-base-100">
        <div className="flex-1">
          <Drawer id="drawer" />

          <NavbarBreadcrumbs />
        </div>

        {/* TODO: Add cart */}
        <div className="flex-none gap-2">
          <UserItem />
        </div>
      </nav>
      <main className="flex-1 overflow-y-auto">{children}</main>
    </DrawerMenu>
  );
};

export default NavigationLayout;
