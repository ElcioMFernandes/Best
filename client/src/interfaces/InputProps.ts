import { ChangeEvent } from "react";

export interface InputProps {
  id: string;
  type: string;
  name?: string;
  value?: string;
  label?: string;
  placeholder?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}
