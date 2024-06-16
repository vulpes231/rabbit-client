import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const ProductTable = ({ productName }) => {
  const [storeProducts, setStoreProducts] = useState(null);
  const { data } = useSelector((state) => state.products);

  let filteredProducts;

  storeProducts?.map((prod) => {
    if (prod.name === productName) {
      filteredProducts = prod;
    }
    return prod;
  });

  const ownerProducts = filteredProducts?.products?.map((product) => {
    return (
      <tr key={product._id} className="">
        <td className="px-6 py-4 whitespace-nowrap uppercase font-semibold">
          {product.name}
        </td>
        <td className="px-6 py-4 whitespace-nowrap capitalize">
          {product.info}
        </td>
        <td className="px-6 py-4 whitespace-nowrap">$ {product.price}</td>
        <td className="px-6 py-4 whitespace-nowrap">
          <button className="bg-red-500 text-white py-2 px-4 rounded-lg cursor-pointer">
            buy
          </button>
        </td>
        <td className="px-6 py-4 whitespace-nowrap"></td>
      </tr>
    );
  });

  useEffect(() => {
    if (data) {
      const dt = data.myProducts;
      setStoreProducts(dt);
    }
  }, [data]);

  return (
    <div className="overflow-x-scroll lg:overflow-hidden bg-white dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800">
      <table>
        <thead className="">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-tight">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-tight">
              Info
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-tight">
              Price
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-tight">
              Action
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-tight">
              Order
            </th>
          </tr>
        </thead>
        <tbody className="divide-x divide-y divide-gray-200 text-xs font-thin">
          {ownerProducts}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
