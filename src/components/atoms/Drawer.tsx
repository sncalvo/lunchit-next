import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";

import { Bars3Icon } from "@heroicons/react/24/solid";

type DrawerMenuProps = {
  links: { href: string; label: string }[];
  id: string;
  children: React.ReactNode;
};

const Drawer: React.FC<{ id: string }> = ({ id }) => (
  <label htmlFor={id} className="btn-ghost drawer-button btn-square btn">
    <Bars3Icon className="h-6 w-6" />
  </label>
);

export const DrawerMenu: React.FC<DrawerMenuProps> = ({
  links,
  id,
  children,
}) => {
  const router = useRouter();
  const { pathname } = router;

  return (
    <div className="drawer-start drawer">
      <input id={id} type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col overflow-y-hidden bg-base-300">
        {children}
      </div>
      <div className="drawer-side">
        <label htmlFor={id} className="drawer-overlay"></label>
        <ul className="menu w-80 bg-base-100 p-4 text-base-content">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={clsx(
                  "btn-ghost rounded-btn btn-sm btn content-center text-center",
                  pathname === link.href && "btn-primary"
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Drawer;
