import React from "react";
import { Line } from "react-chartjs-2";
import { useContext } from "react";
import { CryptoContext } from "../contexts/CryptoContext";
import { Chart as ChartJS } from "chart.js/auto";

const GraphComponent = () => {
  const { cryptoData } = useContext(CryptoContext);

  const data = {
    labels: cryptoData.map((coin) => coin.name),
    datasets: [
      {
        label: "Price",
        data: cryptoData.map((coin) => coin.current_price),
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  return <Line   data={data} />;
};

export default GraphComponent;
