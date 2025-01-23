"use client";
import { Frame } from "@/components/Frame";
import useAuth from "@/hooks/useAuth";

const Transactions = () => {
  const isLoading = useAuth();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Frame displayNavBar={true} displayFooter={true}>
        <p>Transações</p>
      </Frame>
    </>
  );
};

export default Transactions;
