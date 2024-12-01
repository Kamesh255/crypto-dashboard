import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const CryptoContext = createContext();

const CryptoProvider = ({ children }) => {
  const [cryptoData, setCryptoData] = useState([]);
  const [layout, setLayout] = useState(() => {
    // Get layout from local storage or return default layout
    const savedLayout = localStorage.getItem("dashboardLayout");
    return savedLayout ? JSON.parse(savedLayout) : [];
  });

  useEffect(() => { 
    const interval = setInterval(() => {
      axios
        .get("https://api.coingecko.com/api/v3/coins/markets", {
          params: { vs_currency: "usd" },
        })
        .then((response) => {
          setCryptoData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching crypto data:", error);
        });
    }, 10000);

    return () => clearInterval(interval);

    // axios
    // .get("https://api.coingecko.com/api/v3/coins/markets", {
    //   params: { vs_currency: "usd" },
    // })
    // .then((response) => {
    //   setCryptoData(response.data);
    // })
    // .catch((error) => {
    //   console.error("Error fetching crypto data:", error);
    // });
  }, []);

  const saveLayout = (newLayout) => {
    setLayout(newLayout);
    localStorage.setItem("dashboardLayout", JSON.stringify(newLayout));
  };

  console.log(cryptoData);

  return (
    <CryptoContext.Provider value={{ cryptoData, layout, saveLayout }}>
      {children}
    </CryptoContext.Provider>
  );
};

export default CryptoProvider;
