"use client";

// Date-fns
import { format } from "date-fns";

// React
import { useEffect, useState } from "react";

// Components
import ExpandableCard from "@/components/ExpandableCard";
import { Loader } from "@/components/Loader";
import { List } from "@/components/List";

// Hooks
import useAuth from "@/hooks/useAuth";

// Types
import { Transaction } from "@/types/transaction";

// Services
import request from "@/services/fetch";
import { Navbar } from "@/components/Navbar";
import { SvgCoin } from "@/components/SvgCoin";

const Transactions = () => {
  const isLoading = useAuth();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response: Transaction[] = await request({
          endpoint: "transactions",
          method: "GET",
        });
        setTransactions(response);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  if (isLoading || loading) {
    return <Loader />;
  }

  return (
    <>
      <div className="h-full flex flex-col items-center gap-10">
        <Navbar />
        <div className="grid w-5/6 mb-10">
          <List title="Extrato">
            {transactions.map((transaction, index) => (
              <ExpandableCard
                key={index}
                color={transaction.type === "DEB" ? "red" : "green"}
                resumedContent={
                  <div>{`#${transaction.id} - ${format(
                    new Date(transaction.created_at),
                    "dd/MM/yyyy - HH:mm:ss"
                  )} - ${
                    transaction.type === "DEB" ? "Débito" : "Crédito"
                  }`}</div>
                }
                expandedContent={
                  <div className="grid grid-cols-1 gap-4 items-center">
                    <div className="grid justify-center col-span-1"></div>
                    <div className="col-span-1 flex flex-col gap-4 items-left">
                      <p>
                        Data da transação:{" "}
                        {format(
                          new Date(transaction.created_at),
                          "dd/MM/yyyy - HH:mm:ss"
                        )}
                      </p>
                      <p>Motivo: {transaction.detail}</p>
                      {transaction.order && (
                        <p>Pedido: #{transaction.order.id}</p>
                      )}

                      <p className="flex items-center gap-1">
                        Valor: <SvgCoin /> {transaction.value}
                      </p>
                    </div>
                  </div>
                }
              />
            ))}
          </List>
        </div>
      </div>
    </>
  );
};

export default Transactions;
