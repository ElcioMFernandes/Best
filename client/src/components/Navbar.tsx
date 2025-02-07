// Next
import Link from "next/link";

// React
import { useEffect, useState } from "react";

// Interfaces
import { NavbarProps } from "@/interfaces/NavbarProps";

// Services
import useLogout from "@/services/logout";
import request from "@/services/fetch";
import { SvgCoin } from "./SvgCoin";
import { SvgExit } from "./SvgExit";
import { SvgProduct } from "./SvgProduct";
import { SvgOrder } from "./SvgOrder";
import { SvgTransaction } from "./SvgTransaction";

export const Navbar = () => {
  const [balance, setBalance] = useState<string | null>(null);
  const logout = useLogout();

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const response = await request({
          endpoint: `wallets/`,
          method: "GET",
        });

        const userWallet = response[0];
        if (userWallet) {
          setBalance(userWallet.balance);
        }
      } catch (error) {
        console.error("Error fetching balance:", error);
      }
    };

    fetchBalance();
  }, []);

  return (
    <nav className="flex justify-between px-2 py-4 shadow-md w-full select-none">
      <div className="flex gap-1 items-center">
        <SvgCoin />

        {balance !== null ? (
          <span className="text-xl">{parseFloat(balance)}</span>
        ) : (
          <span>...</span>
        )}
      </div>
      <ul className="flex gap-4">
        <li>
          <Link href="/products" className="flex items-center text-xl">
            <SvgProduct /> Início
          </Link>
        </li>
        <li>
          <Link href="/orders" className="flex items-center text-xl">
            <SvgOrder /> Pedidos
          </Link>
        </li>
        <li>
          <Link href="/transactions" className="flex items-center text-xl">
            <SvgTransaction />
            Extrato
          </Link>
        </li>
      </ul>
      <div onClick={logout} className="flex justify-end gap-1 cursor-pointer">
        <SvgExit />
      </div>
    </nav>
  );
};
