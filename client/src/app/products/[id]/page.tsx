"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Frame } from "@/components/Frame";
import useAuth from "@/hooks/useAuth";
import request from "@/services/fetch";

interface Product {
  image: string;
  name: string;
  price: number;
  stock: number;
}

const ProductPage = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const isAuthLoading = useAuth();
  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await request({
          endpoint: `http://192.168.20.51:8000/api/v1/products/${id}`,
          method: "GET",
        });
        setProduct(response);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  if (isAuthLoading || isLoading) {
    return <p>Loading...</p>;
  }

  if (!product) {
    return <p>Product not found</p>;
  }

  return (
    <Frame displayNavBar={true} displayFooter={true}>
      <div className="flex p-6 gap-4 select-none w-4/6 shadow-2xl rounded-md dark:bg-stone-700">
        <img src={product.image} alt={product.name} className="h-full w-1/3" />
        <div className="flex flex-col gap-4 p-4 w-2/3">
          <div className="flex gap-4 items-center">
            <h1 className="text-4xl">{product.name}</h1>
            <p className="text-2xl">${product.price}</p>
          </div>
          <div>
            <p>bla bla bla bla</p>
            <p className="opacity-80">Estoque: {product.stock}</p>
          </div>
          <button
            className="py-2 bg-orange-500 hover:bg-orange-600 rounded-md"
            onClick={() => alert("Comprado!")}
          >
            Comprar
          </button>
        </div>
      </div>
    </Frame>
  );
};

export default ProductPage;
