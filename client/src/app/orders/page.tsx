"use client";
import { Frame } from "@/components/Frame";
import useAuth from "@/hooks/useAuth";

const Orders = () => {
  const isLoading = useAuth();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Frame displayNavBar={true} displayFooter={true}>
        <p>Pedidos</p>
      </Frame>
    </>
  );
};

export default Orders;
