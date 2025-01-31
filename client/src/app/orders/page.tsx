"use client";

import { format } from "date-fns";

// React
import { useEffect, useState } from "react";

// Components
import ExpandableCard from "@/components/ExpandableCard";
import { Loader } from "@/components/Loader";
import { Frame } from "@/components/Frame";
import { List } from "@/components/List";

// Hooks
import useAuth from "@/hooks/useAuth";

// Services
import request from "@/services/fetch";

// Types
import { Order } from "@/types/order";

const Orders = () => {
  const isLoading = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response: Order[] = await request({
          endpoint: "orders",
          method: "GET",
        });
        setOrders(response);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (isLoading || loading) {
    return <Loader />;
  }

  const handleSubmit = async (id: number) => {
    const response = await request({
      endpoint: `orders/${id}/`,
      method: "PATCH",
      body: {
        status: "CAN",
      },
    });
    window.location.reload();
  };

  return (
    <Frame>
      <div className="w-full">
        <List title="Pedidos">
          {orders.map((order, index) => (
            <ExpandableCard
              key={index}
              color={
                order.status === "CAN"
                  ? "red"
                  : order.status === "FIN"
                  ? "green"
                  : ""
              }
              resumedContent={
                <div>{`#${order.id} - ${order.product.name}: ${
                  order.status === "FIN"
                    ? "Finalizado"
                    : order.status === "CAN"
                    ? "Cancelado"
                    : "Pendente"
                }`}</div>
              }
              expandedContent={
                <div className="grid grid-cols-4 gap-4 items-center">
                  <div className="grid justify-center col-span-2 lg:col-span-1">
                    <img
                      src={order.product.image}
                      alt={order.product.name}
                      className="h-24 w-24 md:h-24 md:w-24 lg:h-24 lg:w-24"
                    />
                  </div>
                  <div className="col-span-2 lg:col-span-3 flex flex-col gap-4 items-left">
                    <p>
                      Data de compra:{" "}
                      {format(
                        new Date(order.created_at),
                        "dd/MM/yyyy - HH:mm:ss"
                      )}
                    </p>

                    {order.updated_at && (
                      <p>
                        Última atualização:{" "}
                        {format(
                          new Date(order.updated_at),
                          "dd/MM/yyyy - HH:mm:ss"
                        )}
                      </p>
                    )}
                    {order.status === "PEN" ? (
                      <button
                        onClick={() => handleSubmit(order.id)}
                        className="w-full lg:w-1/3 py-2 rounded bg-neutral-800 border-2 border-red-500 text-red-500 hover:ring-2 ring-red-600"
                      >
                        Cancelar compra
                      </button>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              }
            />
          ))}
        </List>
      </div>
    </Frame>
  );
};

export default Orders;
