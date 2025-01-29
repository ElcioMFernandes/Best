"use client";

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

  return (
    <Frame displayNavBar={true} displayFooter={false}>
      <List title="Pedidos">
        {orders.length ? (
          orders.map((order) => (
            <ExpandableCard
              color={
                order.status === "FIN"
                  ? "green"
                  : order.status === "CAN"
                  ? "red"
                  : ""
              }
              resumedContent={`#${order.id} - ${order.product.name}: ${order.status}`}
              expandedContent={
                <div className="flex flex-row">
                  <img
                    src={order.product.image}
                    alt={order.product.image}
                    className="w-24 h-24"
                  />
                  <div className="flex">
                    <ul className="flex flex-col">
                      <li>Produto: {order.product.name}</li>
                      <li>b</li>
                      <li>c</li>
                      <li>d</li>
                    </ul>
                  </div>
                </div>
              }
              key={order.id}
              {...order}
            />
          ))
        ) : (
          <div>Não há registros</div>
        )}
      </List>
    </Frame>
  );
};

export default Orders;
