import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProductTable from "../components/ProductTable";
import { getAccessToken } from "../utils/getDate";
import Construction from "../components/Construction";
// import Cove from "../components/Cove";
const Server = ({ toggle }) => {
  const navigate = useNavigate();
  const accessToken = getAccessToken();
  useEffect(() => {
    if (!accessToken) {
      navigate("/signin");
    }
  }, [accessToken]);
  return (
    <div
      className={
        toggle
          ? "ml-[60%] md:ml-[40%]"
          : "ml-0 lg:ml-[250px] flex-grow overflow-hidden"
      }
    >
      <div className="w-full space-y-5 min-h-screen ">
        {/* <ProductTable productName={"rdp"} /> */}
        {/* <div className="overflow-x-scroll lg:overflow-hidden bg-white dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800">
          <table>
            <thead>
              <tr>
                <th>location</th>
                <th>ram</th>
                <th>os</th>
                <th>access</th>
                <th>price/month</th>
                <th>availability</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th></th>
                <th>ram</th>
                <th>os</th>
                <th>access</th>
                <th>price/month</th>
                <th>availability</th>
                <th>
                  <button>buy</button>
                </th>
              </tr>
            </tbody>
          </table>
        </div> */}
        <Construction />
      </div>
    </div>
  );
};

export default Server;
