// Next
import Link from "next/link";

// React
import { useEffect, useState } from "react";

// Interfaces
import { NavbarProps } from "@/interfaces/NavbarProps";

// Services
import useLogout from "@/services/logout";
import request from "@/services/fetch";

export const Navbar = (props: NavbarProps) => {
  const [balance, setBalance] = useState<string | null>(null);
  const logout = useLogout();

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const response = await request({
          endpoint: `wallets/`,
          method: "GET",
        });
        const userWallet = response[0]; // Assumindo que o primeiro item é o do usuário autenticado
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
    <nav className="flex justify-between bg-neutral-200 dark:bg-neutral-800 shadow-lg border-b dark:border-b-neutral-700 px-2 py-4 select-none">
      <Link href={"/transactions"} className="flex gap-1 items-center">
        <svg
          className="w-8 h-8 text-gray-800 dark:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="2"
            d="M8 7V6a1 1 0 0 1 1-1h11a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1h-1M3 18v-7a1 1 0 0 1 1-1h11a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1Zm8-3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"
          />
        </svg>

        {balance !== null ? (
          <span className="text-2xl">{parseFloat(balance)}</span>
        ) : (
          <span>...</span>
        )}
      </Link>

      <ul className="flex gap-4">
        {props.items.map((item, index) => (
          <li key={index} className="">
            <Link href={item.path} className="flex items-center text-xl">
              {item.icon}
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
      <div className="flex justify-end gap-1 cursor-pointer">
        <svg
          onClick={logout}
          className="w-8 h-8 text-neutral-800 dark:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M16 12H4m12 0-4 4m4-4-4-4m3-4h2a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3h-2"
          />
        </svg>
      </div>
    </nav>
  );
};
