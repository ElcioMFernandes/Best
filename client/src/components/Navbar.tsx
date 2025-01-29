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
    <nav className="flex p-2 w-full items-center justify-between select-none shadow-md">
      <div className="flex items-center gap-2">
        {/* <img src="/logo.svg" className="pl-2 w-12 h-12" /> */}
        <svg
          className="w-6 h-6 text-neutral-800 dark:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M4 5a2 2 0 0 0-2 2v2.5a1 1 0 0 0 1 1 1.5 1.5 0 1 1 0 3 1 1 0 0 0-1 1V17a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2.5a1 1 0 0 0-1-1 1.5 1.5 0 1 1 0-3 1 1 0 0 0 1-1V7a2 2 0 0 0-2-2H4Z" />
        </svg>
        {balance !== null ? (
          <span>{parseFloat(balance)}</span>
        ) : (
          <span>Carregando...</span>
        )}
      </div>
      <ul className="flex flex-row gap-4 justify-center flex-1">
        {props.items.map((item, index) => (
          <li key={index} className="flex items-center">
            <Link href={item.path} className="flex items-center gap-2">
              {item.icon && <span>{item.icon}</span>}
            </Link>
          </li>
        ))}
      </ul>
      <div className="flex items-center gap-2 cursor-pointer" onClick={logout}>
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
