"use client";

// Date-fns
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

// React
import { useEffect, useState } from "react";

// Components
import ExpandableCard from "@/components/ExpandableCard";
import { Loader } from "@/components/Loader";
import { Frame } from "@/components/Frame";
import { List } from "@/components/List";

// Hooks
import useAuth from "@/hooks/useAuth";

// Types
import { Transaction } from "@/types/transaction";

// Services
import request from "@/services/fetch";

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
    <Frame displayNavBar={true} displayFooter={false}>
      <List title="Extrato">
        {transactions.length ? (
          transactions.map((transaction) => (
            <ExpandableCard
              color={
                transaction.type === "ADD"
                  ? "green"
                  : transaction.type === "DEB"
                  ? "red"
                  : ""
              }
              resumedContent={`#${transaction.id} - ${transaction.detail}`}
              expandedContent={
                <div className="flex flex-row gap-4">
                  {transaction.order && (
                    <img
                      src={transaction.order.product.image}
                      alt={transaction.order.product.name}
                      className="w-24 h-24 select-none"
                    />
                  )}
                  <div>
                    <ul>
                      <li>
                        Tipo:{" "}
                        {transaction.type === "DEB" ? "Débito" : "Crédito"}
                      </li>
                      <li>Valor: {parseFloat(transaction.value)}</li>
                      {transaction.order?.id && (
                        <li>Pedido: #{transaction.order?.id}</li>
                      )}
                      <li>
                        Data:{" "}
                        {format(
                          new Date(transaction.created_at),
                          "dd/MM/yyyy - HH:mm:ss",
                          { locale: ptBR }
                        )}
                      </li>
                      <li>Detalhe: {transaction.detail}</li>
                    </ul>
                  </div>
                </div>
              }
              key={transaction.id}
              {...transaction}
            />
          ))
        ) : (
          <div>Não há registros</div>
        )}
      </List>
    </Frame>
  );
};

export default Transactions;
