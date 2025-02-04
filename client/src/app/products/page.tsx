"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import useAuth from "@/hooks/useAuth";
import { Frame } from "@/components/Frame";
import Card from "@/components/Card";
import { Product } from "@/types/product";
import { Loader } from "@/components/Loader";
import request from "@/services/fetch";

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
    <Frame>
      <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {products
          .filter((product) => product.stock > 0)
          .map((product, index) => (
            <li key={index}>
              <Link href={`/products/${product.id}`}>
                <Card
                  title={product.name}
                  subtitle={product.price}
                  image={product.image}
                />
              </Link>
            </li>
          ))}
      </ul>
    </Frame>
  );
};

export default Products;
