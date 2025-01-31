"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Frame } from "@/components/Frame";
import useAuth from "@/hooks/useAuth";
import request from "@/services/fetch";
import { Loader } from "@/components/Loader";
import { NotFound } from "@/components/NotFound";
import { Product } from "@/types/product";
import { Wallet } from "@/types/wallet";

const ProductPage = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const [wallet, setWallet] = useState<Wallet>({
    id: 0,
    user: {
      id: 0,
      username: "",
      first_name: "",
      last_name: "",
    },
    balance: 0,
    reserved_balance: "0",
  });
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

    const fetchWallet = async () => {
      try {
        const response = await request({
          endpoint: `wallets/`,
          method: "GET",
        });
        const userWallet = response[0];
        if (userWallet) {
          setWallet(userWallet);
        }
      } catch (error) {
        console.error("Error fetching balance:", error);
      }
    };

    if (id) {
      fetchProduct();
      fetchWallet();
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
    <Frame>
      <div className="grid grid-cols-1 grid-rows-2 md:grid-cols-1 md:grid-rows-2 lg:grid-cols-2 lg:grid-rows-1 border border-neutral-700 shadow-xl rounded-lg items-center w-full py-2">
        <div className="flex justify-center">
          <img
            src={product.image}
            alt=""
            className="lg:h-72 lg:w-72 md:h-64 md:w-64 h-44 w-44"
          />
        </div>
        <div className="flex flex-col gap-10 items-center">
          <div className="flex gap-4 items-center">
            <p className="text-3xl">{product.name}</p>
            <div className="flex text-xl items-center">
              <svg
                className="w-6 h-6 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeWidth="2"
                  d="M8 7V6a1 1 0 0 1 1-1h11a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1h-1M3 18v-7a1 1 0 0 1 1-1h11a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1Zm8-3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"
                />
              </svg>
              <p>{product.price}</p>
            </div>
          </div>
          <p className="m-4">
            Descrição do produto Descrição do produto Descrição do produto
          </p>
          {wallet.balance < parseInt(product.price) ? (
            <p className="text-red-500">Você não possui saldo suficiente!</p>
          ) : product.stock <= 0 ? (
            <p className="text-red-500">Item fora de estoque!</p>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={wallet.balance < parseInt(product.price)}
              className="rounded disabled:hover:cursor-not-allowed disabled:bg-red-500 disabled:hover:bg-red-500 hover:ring-2 bg-neutral-800 shadow-lg border-2 ring-green-600 border-green-500 w-2/3 py-2"
            >
              Comprar
            </button>
          )}
        </div>
      </div>
    </Frame>
  );
};

export default ProductPage;
