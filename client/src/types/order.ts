import { Product } from "./product";
import { User } from "./user";

export interface Order {
  id: number;
  product: Product;
  user: User;
  status: string;
  created_at: string;
  updated_at: string;
}
