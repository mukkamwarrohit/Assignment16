import { useQuery } from "@tanstack/react-query";
import { fetchProductById } from "../api/products";
import { useParams, Link } from "react-router-dom";
import { Product } from "../types";

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading } = useQuery<Product>({
    queryKey: ["product", id],
    queryFn: async () => {
      try {
        return await fetchProductById(id!);
      } catch (error) {
        console.error("Error fetching product details:", error);
        throw error;
      }
    },
    enabled: !!id,
  });

  if (isLoading) return <p>Loading product details...</p>;

  return (
    <div className="product-details">
      <img src={product?.image} alt={product?.title} className="product-image-large" />
      <h2>{product?.title}</h2>
      <p>{product?.description}</p>
      <p className="price">${product?.price}</p>
      <Link to="/">Back to Products</Link>
    </div>
  );
};

export default ProductDetails;
