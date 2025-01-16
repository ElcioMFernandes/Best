import { NavbarProps } from "@/interfaces/NavbarProps";

export const Navbar = (props: NavbarProps) => {
  return (
    <>
      <nav className="flex border py-2 w-full items-center justify-center">
        <ul className="flex flex-row gap-4">
          <li>Menu 1</li>
          <li>Menu 2</li>
          <li>Menu 3</li>
        </ul>
      </nav>
    </>
  );
};
