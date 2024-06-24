import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../features/dashSlice";
import { getAccessToken } from "../utils/getDate";
import { buyProduct } from "../features/orderSlice";

const ProductTable = ({ productName }) => {
  const dispatch = useDispatch();

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [features, setFeatures] = useState([]);
  const [featuresModal, setFeaturesModal] = useState(false);
  const [notification, setNotification] = useState(false);

  const { data } = useSelector((state) => state.products);
  const { placeOrderPending, placeOrderError, placeOrderSuccess } = useSelector(
    (state) => state.order
  );

  const accessToken = getAccessToken();

  const placeOrder = (event) => {
    // Get data attributes from the clicked row
    const category = event.currentTarget.getAttribute("data-category");
    const name = event.currentTarget.getAttribute("data-name");
    const price = event.currentTarget.getAttribute("data-price");

    const orderFormData = {
      category,
      name,
      price,
    };

    console.log("Sending order data to backend:", orderFormData);

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

  const ownerProducts = filteredProducts?.map((prod) => {
    return (
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
            className="bg-blue-500 text-white py-2 px-4 rounded-lg cursor-pointer capitalize"
          >
            buy
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
        <div
          className={
            featuresModal
              ? "fixed top-[50%] right-0 w-60 dark:text-slate-200 bg-slate-200 rounded-xl  text-slate-900 dark:bg-slate-950 p-6  text-center capitalize tracking-wide leading-5"
              : "hidden"
          }
        >
          {/* <span>
            <MdClose className="text-slate-950" />
          </span> */}
          <ul className="flex flex-col">
            {features.map((feature, index) => (
              <li className="p" key={index}>
                * {feature} *
              </li>
            ))}
          </ul>
        </div>
      </tr>
    );
  });

  if (!filteredProducts) {
    return <div className="w-full space-y-5 min-h-screen">Loading...</div>;
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
    if (placeOrderSuccess || placeOrderError) {
      setNotification(true);
      setTimeout(() => {
        timeout = 3000;
        setNotification(false);
      }, timeout);
    }
    return () => clearTimeout(timeout);
  }, [placeOrderSuccess, placeOrderError]);

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
        {notification && (
          <div className="fixed top-0 right-0 p-6 bg-slate-200 dark:bg-slate-950 dark:text-slate-200">
            <p className={placeOrderSuccess ? "text-green-500" : "hidden"}>
              Your order has been placed successsfully.
            </p>
            <p className={placeOrderError ? "text-red-500" : "hidden"}>
              {placeOrderError}
            </p>
          </div>
        )}
      </table>
    </div>
  );
};

export default ProductTable;
