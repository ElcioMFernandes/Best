interface NavbarItem {
  title?: string;
  icon?: React.ReactNode;
  path: string;
}

export interface NavbarProps {
  items: NavbarItem[];
}
