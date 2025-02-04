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
      <div className="grid sm:grid-rows-2 sm:grid-cols-1 md:grid-rows-1 md:grid-cols-2 lg:grid-rows-1 lg:grid-cols-2 w-full p-2 gap-2 items-center shadow border border-neutral-700 rounded-md">
        <img src={product.image} alt={product.name} className="max-h-92 " />
        <div className="h-full">
          <ul className="flex flex-col text-justify h-full justify-center">
            <li className="flex gap-4 text-2xl">
              <p>{product.name}</p>
              <div className="flex">
                <svg
                  className="w-8 h-8 text-gray-800 dark:text-white"
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
            </li>
            <li className="">
              <p>Em estoque: {product.stock}</p>
            </li>

            <li className="flex flex-col text-justify gap-10 py-10">
              <p>{product.description}</p>
              {wallet.balance < parseInt(product.price) ? (
                <p className="cursor-default w-3/4 py-2 shadow-md shadow-red-500/50 bg-red-500 rounded hover:bg-red-600 ring-red-700 hover:ring-2 text-center">
                  Você não possui saldo suficiente!
                </p>
              ) : product.stock <= 0 ? (
                <p className="text-red-500">Item fora de estoque!</p>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={wallet.balance < parseInt(product.price)}
                  className="w-3/4 py-2 shadow-md shadow-green-500/50 bg-green-500 rounded hover:bg-green-600 ring-green-700 hover:ring-2"
                >
                  Comprar
                </button>
              )}
            </li>
          </ul>
        </div>
      </div>
    </Frame>
  );
};

export default ProductPage;
