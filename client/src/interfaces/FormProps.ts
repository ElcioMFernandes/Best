export interface FormProps {
  formTitle: string;
  formAction: React.FormEvent<HTMLFormElement> | ((data: any) => void);
  formMethod: "GET" | "POST" | "PUT" | "DELETE";
  children: React.ReactNode;
}
