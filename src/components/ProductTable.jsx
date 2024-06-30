import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../features/dashSlice";
import { getAccessToken } from "../utils/getDate";
import { buyProduct, reset } from "../features/orderSlice";
import { MdClose } from "react-icons/md";
import { Link } from "react-router-dom";
const ProductTable = ({ productName }) => {
  const dispatch = useDispatch();

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [features, setFeatures] = useState([]);
  const [featuresModal, setFeaturesModal] = useState(false);
  const [notification, setNotification] = useState(false);
  const [orderLoading, setorderLoading] = useState(false);
  const [form, setForm] = useState({});

  const { data } = useSelector((state) => state.products);
  const { placeOrderPending, placeOrderError, placeOrderSuccess } = useSelector(
    (state) => state.order
  );

  const accessToken = getAccessToken();

  const placeOrder = (event) => {
    event.stopPropagation();
    // Get data attributes from the clicked row
    const category = event.currentTarget.getAttribute("data-category");
    const item = event.currentTarget.getAttribute("data-name");
    const price = event.currentTarget.getAttribute("data-price");

    const orderFormData = {
      category,
      item,
      price,
    };

    setForm(orderFormData);
    // console.log("Sending order data to backend:", orderFormData);

    dispatch(buyProduct(orderFormData));
  };

  const handleShowInfo = (event) => {
    const dataFeatures = event.currentTarget.getAttribute("data-features");

    console.log(dataFeatures);
    console.log("clicked");

    const featuresArray = dataFeatures.split(",").map((item) => item.trim());

    setFeatures(featuresArray);

    setFeaturesModal(true);
  };

  useEffect(() => {
    if (placeOrderPending) {
      setorderLoading(true);
    } else {
      setorderLoading(false);
    }
  }, [placeOrderPending]);

  const ownerProducts = filteredProducts?.map((prod) => {
    return (
      <>
        <tr key={prod._id} className="text-xs font-medium">
          <td className="px-6 py-4 whitespace-nowrap uppercase font-semibold">
            {prod.name}
          </td>
          <td className="px-6 py-4 whitespace-nowrap capitalize">
            {prod.description ? `${prod.description.slice(0, 50)}...` : "None"}
          </td>
          <td className="px-6 py-4 whitespace-nowrap">$ {prod.price}</td>

          <td className="px-6 py-4 whitespace-nowrap">
            <button
              onClick={placeOrder}
              data-category={prod.category}
              data-name={prod.name}
              data-price={prod.price}
              className={`py-2 px-4 rounded-lg cursor-pointer capitalize ${
                orderLoading
                  ? "bg-gray-400 text-gray-600"
                  : "bg-blue-500 text-white"
              }`}
              disabled={orderLoading}
            >
              Buy
            </button>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <button
              onClick={handleShowInfo}
              data-features={prod.features}
              className="bg-green-500 text-white py-2 px-4 rounded-lg cursor-pointer capitalize"
            >
              more info
            </button>
          </td>
          <td
            className={
              featuresModal
                ? "fixed top-[50%] right-0 w-60 dark:text-slate-200 bg-slate-200 rounded-xl  text-slate-900 dark:bg-slate-950 p-6  text-center capitalize tracking-wide leading-5"
                : "hidden"
            }
          >
            <ul className="flex flex-col">
              {features.map((feature, index) => (
                <li className="" key={index}>
                  * {feature} *
                </li>
              ))}
            </ul>
          </td>
        </tr>
      </>
    );
  });

  if (!filteredProducts) {
    return <div className="w-full space-y-5 min-h-screen">Loading...</div>;
  }
  function closeModal() {
    setNotification(false);
  }

  useEffect(() => {
    let timeout;
    if (featuresModal) {
      timeout = 2000;
      setTimeout(() => {
        setFeaturesModal(false);
      }, timeout);
    }
    return () => clearTimeout(timeout);
  }, [featuresModal]);

  useEffect(() => {
    if (accessToken) {
      dispatch(getProducts());
    }
  }, [accessToken, dispatch]);

  useEffect(() => {
    if (data && data.products) {
      const filteredItems = data.products.filter(
        (prod) => prod.category === productName
      );
      setFilteredProducts(filteredItems);
    }
  }, [data, productName]);

  useEffect(() => {
    let timeout;
    if (placeOrderSuccess) {
      setNotification(true);
      setTimeout(() => {
        timeout = 3000;
        setNotification(false);
        // dispatch(reset());
      }, timeout);
    }
    return () => clearTimeout(timeout);
  }, [placeOrderSuccess]);

  return (
    <div className="overflow-x-scroll lg:overflow-hidden bg-white dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50 dark:bg-slate-900">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Info
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Price
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Action
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Order
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">{ownerProducts}</tbody>
      </table>
      {notification && (
        <div className="fixed top-[50%] right-0 p-6 bg-white shadow  dark:bg-slate-950 dark:text-slate-200 text-xs flex flex-col  rounded-lg z-50">
          <p
            className={
              placeOrderSuccess
                ? "text-green-500 flex flex-col gap-2"
                : "hidden"
            }
          >
            <span
              onClick={closeModal}
              className="flex items-center justify-end text-black cursor-pointer"
            >
              close
              <MdClose />
            </span>
            Your order has been placed successsfully.
            <Link>go to orders</Link>
          </p>
          <p className={placeOrderError ? "text-red-500" : "hidden"}>
            {placeOrderError}
          </p>
        </div>
      )}
    </div>
  );
};

export default ProductTable;
