"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import useAuth from "@/hooks/useAuth";
import Card from "@/components/Card";
import { Product } from "@/types/product";
import { Loader } from "@/components/Loader";
import request from "@/services/fetch";
import { Navbar } from "@/components/Navbar";

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const isAuthLoading = useAuth();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await request({
          endpoint: "products",
          method: "GET",
        });
        const filteredProducts = response.map((product: any) => ({
          id: product.id,
          name: product.name,
          desc: product.description,
          price: product.price,
          stock: product.stock,
          image: product.image,
        }));
        setProducts(filteredProducts);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  if (isAuthLoading || isLoading) {
    return <Loader />;
  }

  return (
    <div className="h-full flex flex-col items-center gap-10">
      <Navbar />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 w-5/6 gap-4 mb-10">
        {products
          .filter((product) => product.stock > 0)
          .map((product, index) => (
            <Link href={`/products/${product.id}`} key={product.id}>
              <Card
                title={product.name}
                subtitle={product.price}
                image={product.image}
              />
            </Link>
          ))}
      </div>
    </div>
  );
};

export default Products;
