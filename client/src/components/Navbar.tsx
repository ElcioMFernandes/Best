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
      <Link href={"/transactions"} className="flex gap-1">
        <svg
          className="w-6 h-6 text-gray-800 dark:text-white"
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
            d="M5 18h14M5 18v3h14v-3M5 18l1-9h12l1 9M16 6v3m-4-3v3m-2-6h8v3h-8V3Zm-1 9h.01v.01H9V12Zm3 0h.01v.01H12V12Zm3 0h.01v.01H15V12Zm-6 3h.01v.01H9V15Zm3 0h.01v.01H12V15Zm3 0h.01v.01H15V15Z"
          />
        </svg>

        {balance !== null ? (
          <span>{parseFloat(balance)}</span>
        ) : (
          <span>...</span>
        )}
      </Link>

      <ul className="flex gap-4">
        {props.items.map((item, index) => (
          <li key={index} className="">
            <Link href={item.path} className="flex">
              {item.icon}
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
      <div className="flex justify-end gap-1 cursor-pointer" onClick={logout}>
        <p>Sair</p>
        <svg
          className="w-6 h-6 text-neutral-800 dark:text-white"
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
