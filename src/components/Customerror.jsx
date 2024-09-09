import React, { useEffect } from "react";

const Customerror = ({ error, setError }) => {
  useEffect(() => {
    let timeout;
    if (error) {
      timeout = 3000;
      setTimeout(() => {
        setError(false);
      }, timeout);
    }
  }, [error]);
  return (
    <div className={`${error ? "flex" : "hidden"}`}>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default Customerror;
