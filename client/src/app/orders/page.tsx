"use client";

import { useEffect, useState } from "react";
import ExpandableCard from "@/components/ExpandableCard";
import { Frame } from "@/components/Frame";
import { List } from "@/components/List";
import { Loader } from "@/components/Loader";
import useAuth from "@/hooks/useAuth";
import request from "@/services/fetch";
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
              resumedContent={`#${order.id} - ${order.product.name}: ${order.status}`}
              expandedContent={
                <div className="flex flex-row">
                  <img
                    src={order.product.image}
                    alt={order.product.image}
                    className="w-16 h-16"
                  />
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
