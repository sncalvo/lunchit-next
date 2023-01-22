import Drawer, { DrawerMenu } from "../atoms/Drawer";
import NavbarBreadcrumbs from "../organisms/NavbarBreadcrumbs";
import UserItem from "../organisms/UserItem";

type Props = {
  children: React.ReactNode;
};

const NavigationLayout: React.FC<Props> = ({ children }) => (
  <DrawerMenu id="drawer" links={[{ href: "/", label: "Home" }]}>
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

export default NavigationLayout;
