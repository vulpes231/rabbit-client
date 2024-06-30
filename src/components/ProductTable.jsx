import React from "react";

const headers = [
  {
    id: "name",
    name: "Name",
  },
  {
    id: "price",
    name: "Price",
  },
  {
    id: "category",
    name: "Category",
  },
  {
    id: "description",
    name: "Description",
  },
  {
    id: "features",
    name: "features",
  },
];

const ProductTable = ({ data, title }) => {
  const handleClick = (prd) => {
    console.log(prd);
  };
  return (
    <div className=" overflow-auto w-full ">
      <table className=" min-w-full bg-white dark:bg-slate-950 divide-y divide-gray-200 dark:divide-gray-700 overflow-x-scroll">
        <thead className="bg-red-500 dark:bg-slate-950 ">
          <tr className="text-white dark:text-slate-200 ">
            {headers.map((hdr) => (
              <th
                key={hdr.id}
                className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider "
              >
                {hdr.name}
              </th>
            ))}
            <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700 text-xs font-thin capitalize overflow-auto text-center font-[Montserrat]">
          {data?.map((product, index) => (
            <tr
              key={product._id}
              className={`${
                index % 2 === 0
                  ? "bg-gray-100 dark:bg-slate-800"
                  : "bg-gray-200 dark:bg-slate-700"
              } text-gray-700 dark:text-gray-300`}
            >
              <td className="px-6 py-4 whitespace-nowrap">{product.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                ${product.price || "None"}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {product.category}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {product.description?.slice(0, 50) || "None"}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {product.features || "None"}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button
                  className="px-8 py-2.5 inline-flex rounded-lg bg-blue-500 text-white text-sm font-medium capitalize hover:bg-blue-600"
                  onClick={() => handleClick(product)}
                >
                  {title}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
