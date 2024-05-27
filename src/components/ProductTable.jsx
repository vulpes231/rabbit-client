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
      <tr
        key={product._id}
        className="bg-white bg-opacity-10 border-b hover:bg-gray-50 text-[#fff] hover:text-[#333] hover:cursor-pointer"
      >
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
    <div className="flex flex-col">
      <div className=" sm:-mx-6 lg:-mx-8">
        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
          <div className="overflow-hidden shadow-md sm:rounded-lg">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Info
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order
                  </th>
                </tr>
              </thead>
              <tbody className="divide-x divide-y divide-gray-200 text-xs font-thin">
                {ownerProducts}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductTable;
