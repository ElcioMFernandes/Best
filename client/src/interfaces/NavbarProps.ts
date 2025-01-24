interface NavbarItem {
  title: string;
  path: string;
  icon?: React.ReactNode;
}

export interface NavbarProps {
  title: string;
  items: NavbarItem[];
}
