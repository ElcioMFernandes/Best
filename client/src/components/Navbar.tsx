import { NavbarProps } from "@/interfaces/NavbarProps";
import useLogout from "@/services/logout";
import Link from "next/link";

export const Navbar = (props: NavbarProps) => {
  const logout = useLogout();

  return (
    <>
      <nav className="flex py-2 w-full items-center justify-between select-none shadow-md">
        <div className="flex-1 flex items-center">
          <img src="logo.svg" className="pl-2 w-12 h-12" />
        </div>
        <ul className="flex flex-row gap-4 justify-center flex-1">
          {props.items.map((item, index) => (
            <li key={index} className="flex items-center">
              <Link href={item.path} className="flex items-center gap-2">
                {item.icon && <span>{item.icon}</span>}
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
        <button className="flex-1 pr-4 text-right" onClick={logout}>
          Sair
        </button>
      </nav>
    </>
  );
};
