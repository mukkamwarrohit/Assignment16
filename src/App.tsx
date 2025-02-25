import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "./pages/Home";
import ProductPage from "./pages/ProductPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false, // Disable retries for better debugging
      refetchOnWindowFocus: false, // Prevent refetching on window focus
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductPage />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;