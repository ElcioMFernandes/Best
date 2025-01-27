import { User } from "./user";

export interface Wallet {
  id: number;
  user: User;
  balance: number;
  reserved_balance: string;
}
