"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { Frame } from "@/components/Frame";
import useAuth from "@/hooks/useAuth";
import Card from "@/components/Card";
import Link from "next/link";

interface Product {
  id: number;
  name: string;
  price: string;
  stock: number;
  image: string;
}

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const isAuthLoading = useAuth();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const accessToken = sessionStorage.getItem("accessToken");
        const response = await axios.get(
          "http://192.168.20.51:8000/api/v1/products",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        const filteredProducts = response.data.map((product: any) => ({
          id: product.id,
          name: product.name,
          price: product.price,
          stock: product.stock,
          image: product.image,
        }));
        setProducts(filteredProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (isAuthLoading || isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <Frame displayNavBar={true} displayFooter={true}>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product, index) => (
          <li key={index}>
            <Link href={`/products/${product.id}`}>
              <Card
                title={product.name}
                subtitle={product.price}
                description={`Em estoque: ${product.stock}`}
                image={product.image}
              ></Card>
            </Link>
          </li>
        ))}
      </ul>
    </Frame>
  );
};

export default Products;
