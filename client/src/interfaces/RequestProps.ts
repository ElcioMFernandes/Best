export interface RequestProps {
  endpoint: string;
  method: "GET" | "POST" | "PATCH" | "DELETE";
  body?: any;
  retry?: boolean; // Flag to indicate if this is a retry attempt
}
