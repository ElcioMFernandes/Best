"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import request from "@/services/fetch";
import { Loader } from "@/components/Loader";
import { NotFound } from "@/components/NotFound";
import { Product } from "@/types/product";
import { Wallet } from "@/types/wallet";
import { SvgCoin } from "@/components/SvgCoin";
import { Navbar } from "@/components/Navbar";

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
    <>
      <div className="h-full flex flex-col items-center gap-10 select-none">
        <Navbar />
        <div className="w-5/6 grid grid-cols-1 lg:grid-cols-2">
          <div className="grid w-full p-2 items-center justify-center">
            <img
              src={product.image}
              alt={product.name}
              className="h-52 lg:h-80"
            />
          </div>
          <div className="grid w-full p-2 gap-2">
            <div className="flex gap-4 items-center">
              <p className="text-4xl">{product.name}</p>
              <div className="flex gap-1 items-center">
                <SvgCoin />
                <p className="text-xl">{product.price}</p>
              </div>
            </div>
            <p className="text-sm">Em estoque: {product.stock}</p>
            <p className="text-lg">{product.description}</p>
            {Number(wallet.balance) < Number(product.price) ? (
              <button className="bg-red-500 rounded shadow-lg shadow-red-700/50 hover:bg-red-600 py-2 cursor-not-allowed lg:py-0 lg:text-lg">
                Você não possui saldo suficiente
              </button>
            ) : Number(product.stock) > 0 ? (
              <button
                onClick={handleSubmit}
                className="bg-green-500 rounded shadow-lg shadow-green-700/50 hover:bg-green-600 py-2 cursor-pointer lg:py-0 lg:text-lg"
              >
                Comprar
              </button>
            ) : (
              <button className="bg-yellow-500 rounded shadow-lg shadow-yellow-700/50 hover:bg-yellow-600 py-2 cursor-not-allowed lg:py-0 lg:text-lg">
                Item sem estoque
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductPage;
