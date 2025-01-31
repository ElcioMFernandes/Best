import { ChangeEvent } from "react";

export interface InputProps {
  id: string;
  type: string;
  name?: string;
  value?: string;
  label?: string;
  required?: boolean;
  placeholder?: string;
  maxLength?: number;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}
