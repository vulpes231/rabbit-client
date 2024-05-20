import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
// import Construction from "../components/Construction";
import { useNavigate } from "react-router-dom";
import ProductTable from "../components/ProductTable";

const Account = () => {
  // const [storeProducts, setStoreProducts] = useState(null);
  // const { data } = useSelector((state) => state.products);
  const { accessToken } = useSelector((state) => state.signin);
  const navigate = useNavigate();

  // let filteredProducts;

  // storeProducts?.map((prod) => {
  //   if (prod.name === "account") {
  //     filteredProducts = prod;
  //   }
  //   return prod;
  // });

  // console.log(filteredProducts);

  // const myAccounts = filteredProducts?.products?.map((product) => {
  //   return (
  //     <tr>
  //       <td>{product.name}</td>
  //       <td>{product.info}</td>
  //       <td>{product.price}</td>
  //     </tr>
  //   );
  // });

  useEffect(() => {
    if (!accessToken) {
      navigate("/signin");
    }
  }, [accessToken]);

  // useEffect(() => {
  //   if (data) {
  //     const dt = data.myProducts;
  //     setStoreProducts(dt);
  //   }
  // }, [data]);
  return (
    <section className="min-h-screen w-full p-6">
      <div className="ssize h-[500px] overflow-y-scroll">
        <ProductTable productName={"account"} />
      </div>
    </section>
  );
};

export default Account;
