import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import { axiosInstance } from "../lib/axios";

const inter = Inter({ subsets: ["latin"] });

type productType = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
};

export default function Home() {
  const [products, setProducts] = useState<productType[]>([]); // Menyimpan data response GET
  const [isLoading, setIsLoading] = useState(false);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
        const productsResponse = await axiosInstance.get("/products");

        setProducts(productsResponse.data);
    } catch (error) {
      console.log(error);
    }
  };

  const renderProducts = () => {
    return products.map((product, index) => {
      return (
        <tr key={index}>
          <td>{product.id}</td>
          <td>{product.title}</td>
          <td>{product.price}</td>
          <td>{product.description}</td>
          <td>{product.category}</td>
          <td>{product.image}</td>
        </tr>
      );
    });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <table className="border-collapse border border-slate-500">
        <thead className="">
          <tr>
            <th className="border border-slate-600">ID</th>
            <th className="border border-slate-600">Tittle</th>
            <th className="border border-slate-600">Price</th>
            <th className="border border-slate-600">Description</th>
            <th className="border border-slate-600">Category</th>
            <th className="border border-slate-600">Image</th>
          </tr>
        </thead>
        <tbody>
          {renderProducts()}
          {isLoading && <button type="button" className="bg-indigo-500 ..." disabled>
            <svg
              className="animate-spin h-5 w-5 mr-3 ..."
              viewBox="0 0 24 24"
            ></svg>
            Processing...
          </button>}
          
        </tbody>
      </table>
    </main>
  );
}
