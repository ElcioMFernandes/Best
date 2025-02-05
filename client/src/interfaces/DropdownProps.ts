export interface DropdownProps {
  id: string;
  label?: string;
  options: { [key: string]: string };
  value: string;
  onChange?: (value: string) => void;
}
