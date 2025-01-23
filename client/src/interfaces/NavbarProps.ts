interface NavbarItem {
  title: string;
  path: string;
}

export interface NavbarProps {
  title: string;
  items: NavbarItem[];
}
