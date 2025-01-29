"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Frame } from "@/components/Frame";
import useAuth from "@/hooks/useAuth";
import request from "@/services/fetch";
import { Loader } from "@/components/Loader";
import { NotFound } from "@/components/NotFound";

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
  const router = useRouter();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await request({
          endpoint: `products/${id}`,
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
    return <Loader />;
  }

  if (!product) {
    return <NotFound />;
  }

  const handleSubmit = async () => {
    try {
      await request({
        endpoint: `orders/`,
        method: "POST",
        body: {
          product_id: id,
        },
      });
      router.push("/products/");
    } catch (error) {
      console.error("Error buying product:", error);
    }
  };

  return (
    <Frame displayNavBar={true} displayFooter={false}>
      <div className="flex p-6 gap-4 select-none lg:w-4/6 md:3/4 sm:1/1 shadow-2xl rounded-lg dark:border dark:border-stone-600 dark:border-opacity-30">
        <img src={product.image} alt={product.name} className="h-full w-1/3" />
        <div className="flex flex-col gap-4 p-4 w-2/3">
          <div className="flex gap-4 items-center justify-center">
            <h1 className="text-4xl">{product.name}</h1>
            <p className="text-2xl flex flex-row gap-2">
              {
                <svg
                  className="w-6 h-6 text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M4 5a2 2 0 0 0-2 2v2.5a1 1 0 0 0 1 1 1.5 1.5 0 1 1 0 3 1 1 0 0 0-1 1V17a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2.5a1 1 0 0 0-1-1 1.5 1.5 0 1 1 0-3 1 1 0 0 0 1-1V7a2 2 0 0 0-2-2H4Z" />
                </svg>
              }
              {product.price}
            </p>
          </div>
          <div>
            <p>bla bla bla bla</p>
            <p className="opacity-80">Estoque: {product.stock}</p>
          </div>
          <button
            className="rounded-md bg-red-500 hover:bg-red-600 w-full py-2 text-white"
            onClick={handleSubmit}
          >
            Comprar
          </button>
        </div>
      </div>
    </Frame>
  );
};

export default ProductPage;
