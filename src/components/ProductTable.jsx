import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { buyProduct, resetPlaceOrder } from "../features/orderSlice";
import { Link, useNavigate } from "react-router-dom";

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
    id: "feature",
    name: "Features",
  },

  {
    id: "actions",
    name: "Actions",
  },
];

const ProductTable = ({ data }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    item: "",
    price: "",
  });

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [confirmModal, setConfirmModal] = useState(false);

  const { placeOrderError, placeOrderSuccess, placeOrderPending } = useSelector(
    (state) => state.order
  );

  const handleClick = (prd) => {
    const orderFormData = {
      item: prd.name,
      price: prd.price || 0,
    };
    setForm(orderFormData);
    setConfirmModal(true);
  };

  const buy = (e) => {
    e.preventDefault();
    dispatch(buyProduct(form));
    console.log(form);
  };

  const closeConfirm = () => {
    setConfirmModal(false);
  };

  useEffect(() => {
    if (placeOrderSuccess) {
      setSuccess(true);
    }
  }, [placeOrderSuccess]);

  useEffect(() => {
    if (placeOrderError) {
      setError(placeOrderError);
    }
  }, [placeOrderError]);

  useEffect(() => {
    let timeout;
    if (success) {
      timeout = 6000;
      setTimeout(() => {
        setForm({
          item: "",
          price: "",
        });
        setSuccess(false);
        setError(false);
        setConfirmModal(false);
        dispatch(resetPlaceOrder());
        navigate("/order");
      }, timeout);
    }
    return () => clearTimeout(timeout);
  }, [success]);

  useEffect(() => {
    // console.log("clearing all state");
    let timeout;
    if (error) {
      timeout = 4000;
      setTimeout(() => {
        setForm({
          item: "",
          price: "",
        });
        setError(false);

        setConfirmModal(false);
      }, timeout);
    }
    return () => clearTimeout(timeout);
  }, [error]);

  return (
    <>
      <table className="bg-white dark:bg-slate-950 divide-y divide-gray-200 dark:divide-gray-700 w-full overflow-auto mt-8">
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
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700 text-xs font-normal capitalize text-center font-[Montserrat]">
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
                ${product.price || 0}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {product.category}
              </td>
              <td className="px-6 py-4">
                <span className="w-[30%]">
                  {product.description
                    ? product.description.split(",").map((desc, index) => {
                        const trimmedDesc = desc.trim();
                        // console.log(trimmedDesc);
                        return (
                          <span
                            className="flex gap-1 items-center justify-center"
                            key={index}
                          >
                            {trimmedDesc.includes("https") ? (
                              <Link
                                className="lowercase text-red-500 underline active:text-blue-500"
                                to={trimmedDesc}
                                target="_blank"
                              >
                                {trimmedDesc}
                              </Link>
                            ) : (
                              trimmedDesc
                            )}
                          </span>
                        );
                      })
                    : // Handle the case where product.description is not a string
                      "No description available"}
                </span>
              </td>

              <td className={"px-6 py-4 "}>
                <span
                  className={
                    product.category === "link" ? "hidden" : "w-[30%] "
                  }
                >
                  {product.features ? product.features : "None"}
                </span>
              </td>

              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center gap-2">
                  <button
                    className="px-6 py-2.5 inline-flex rounded-3xl bg-yellow-500 text-white text-sm font-medium capitalize hover:bg-yellow-600"
                    onClick={() => handleClick(product)}
                  >
                    {product.category.includes("service") ? "request" : "order"}
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* confirm modal */}
      {confirmModal && (
        <div className="top-[130px] lg:top-[80px] z-50 right-2 fixed bg-white rounded-xl shadow p-6 flex flex-col items-center justify-center gap-4 w-[280px] text-xs font-medium">
          {success && (
            <h4 className="text-green-500 capitalize flex flex-col gap-2 items-center">
              order placed successfully.{" "}
              <Link to={"/order"} className="underline font-thin ">
                view orders
              </Link>
            </h4>
          )}
          {error && (
            <h4 className="text-red-500 capitalize">{placeOrderError}</h4>
          )}
          <div className="flex flex-col gap-6 w-full text-slate-950">
            <h4>confirm {form.item} order </h4>
            <div className="flex justify-between items-center w-full">
              <button
                className="bg-green-500 text-white py-2 px-6 inline-flex rounded-xl"
                onClick={buy}
              >
                {!placeOrderPending ? " confirm" : "Wait..."}
              </button>
              <button
                className="bg-red-500 text-white py-2 px-6 inline-flex rounded-xl"
                onClick={closeConfirm}
              >
                cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductTable;
