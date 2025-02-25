import { Product } from "../types";

export const fetchProducts = async (): Promise<Product[]> => {
  console.log("Fetching products...");
  const res = await fetch("https://fakestoreapi.com/products");

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
};

export const fetchProductById = async (id: string): Promise<Product> => {
  console.log(`Fetching product with id: ${id}`);
  const res = await fetch(`https://fakestoreapi.com/products/${id}`);

  if (!res.ok) {
    throw new Error("Failed to fetch product");
  }

  return res.json();
};

export const addProduct = async (product: Omit<Product, "id">): Promise<Product> => {
  console.log("Adding product...", product);
  const res = await fetch("https://fakestoreapi.com/products", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });

  if (!res.ok) {
    throw new Error("Failed to add product");
  }

  return res.json();
};
