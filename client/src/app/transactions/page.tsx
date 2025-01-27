"use client";

import { useEffect, useState } from "react";
import ExpandableCard from "@/components/ExpandableCard";
import { Frame } from "@/components/Frame";
import { List } from "@/components/List";
import { Loader } from "@/components/Loader";
import useAuth from "@/hooks/useAuth";
import request from "@/services/fetch";
import { Transaction } from "@/types/transaction";

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
      <List title="Extrato de transações">
        {transactions.length ? (
          transactions.map((transaction) => (
            <ExpandableCard
              resumedContent={`#${transaction.id} - ${transaction.detail}: ${transaction.type}`}
              expandedContent={
                <div className="flex flex-row">
                  {transaction.order && (
                    <img
                      src={transaction.order.product.image}
                      alt={transaction.order.product.name}
                      className="w-16 h-16"
                    />
                  )}
                  <div>
                    <p>Valor: R$ {parseFloat(transaction.value).toFixed(2)}</p>
                    <p>Tipo: {transaction.type}</p>
                    <p>Detalhe: {transaction.detail}</p>
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
