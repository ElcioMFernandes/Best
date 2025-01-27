import { Order } from "./order";
import { Wallet } from "./wallet";

export interface Transaction {
  id: number;
  order: Order | null;
  wallet: Wallet;
  value: string;
  type: string;
  detail: string;
}
