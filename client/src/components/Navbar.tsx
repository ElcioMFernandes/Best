import { NavbarProps } from "@/interfaces/NavbarProps";
import useLogout from "@/services/logout";
import Link from "next/link";

export const Navbar = (props: NavbarProps) => {
  const logout = useLogout();

  return (
    <>
      <nav className="flex border py-2 w-full items-center justify-between select-none">
        <h1 className="flex-1 pl-4 font-semibold">{props.title}</h1>
        <ul className="flex flex-row gap-4 justify-center flex-1">
          {props.items.map((item, index) => (
            <li key={index}>
              <Link href={item.path}>{item.title}</Link>
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
