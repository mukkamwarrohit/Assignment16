import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../api/products";
import { Link } from "react-router-dom";
import { Product } from "../types";

const ProductList = () => {
  const { data: products, isLoading, isFetching } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async () => {
      try {
        return await fetchProducts();
      } catch (error) {
        console.error("Error fetching products:", error);
        throw error; // Ensure query sees the error
      }
    },
    enabled: true,
  });

  if (isLoading) return <p>Loading products...</p>;

  return (
    <div className="product-list">
      <h1>Products</h1>
      {isFetching && <p>Updating...</p>}
      <ul>
        {products?.map((product) => (
          <li key={product.id} className="product-card">
            <img src={product.image} alt={product.title} className="product-image" />
            <h3>{product.title}</h3>
            <p>${product.price}</p>
            <Link to={`/product/${product.id}`}>View Details</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
