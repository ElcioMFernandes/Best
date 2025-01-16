export interface FormProps {
  formTitle: string;
  formAction: React.FormEvent<HTMLFormElement> | (() => void);
  formMethod: "GET" | "POST" | "PUT" | "DELETE";
  children: React.ReactNode;
}
