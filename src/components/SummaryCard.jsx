import React from "react";
import { useContext } from "react";
import { CryptoContext } from "../contexts/CryptoContext";

const SummaryCard = () => {
  const { cryptoData } = useContext(CryptoContext);

  const highest = cryptoData.reduce((max, coin) => (coin.current_price > max ? coin.current_price : max), 0);
  const lowest = cryptoData.reduce((min, coin) => (coin.current_price < min ? coin.current_price : min), Infinity);

  return (
    <div className=" border-4  rounded-4 bg-light p-3 border">
      <h3>Summary</h3>
      <p>Highest Price: ${highest}</p>
      <p>Lowest Price: ${lowest}</p>
    </div>
  );
};

export default SummaryCard;
