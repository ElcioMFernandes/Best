export interface DropdownProps {
  id: string;
  label?: string;
  options: string[];
  value: string;
  onChange?: (value: string) => void;
}
