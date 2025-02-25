import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addProduct } from "../api/products";
import { Product } from "../types";

const ProductForm = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: addProduct,
    onSuccess: (newProduct) => {
      console.log("Product added successfully!", newProduct);
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error) => {
      console.error("Failed to add product:", error);
    },
  });

  const [newProduct, setNewProduct] = useState<Omit<Product, "id">>({
    title: "",
    price: 0,
    category: "",
    description: "",
    image: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting product:", newProduct);
    mutation.mutate(newProduct);
  };

  return (
    <div className="product-form">
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={newProduct.title}
          onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
        />
        <input
          type="number"
          placeholder="Price"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
        />
        <textarea
          placeholder="Description"
          value={newProduct.description}
          onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
        />
        <input
          type="text"
          placeholder="Image URL"
          value={newProduct.image}
          onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
        />
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default ProductForm;
