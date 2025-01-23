"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Frame } from "@/components/Frame";
import useAuth from "@/hooks/useAuth";

const ProductPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const isAuthLoading = useAuth();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      setIsLoading(false);
    }
  }, [id]);

  if (isAuthLoading || isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <Frame displayNavBar={true} displayFooter={true}>
      <p>Product ID: {id}</p>
    </Frame>
  );
};

export default ProductPage;
