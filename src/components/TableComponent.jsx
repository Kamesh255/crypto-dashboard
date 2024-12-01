import React, { useContext, useEffect, useState } from "react";
import { CryptoContext } from "../contexts/CryptoContext";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

const TableComponent = () => {
  const { cryptoData } = useContext(CryptoContext);

  const [filteredData, setFilteredData] = useState(cryptoData);
  const [sortedData, setSortedData] = useState(cryptoData);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [filterQuery, setFilterQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);


  useEffect(() => {
    const filtered = cryptoData.filter((item) => {

      if (filterQuery == "") {
        return item
      } else if (item?.name?.toLowerCase().includes(filterQuery.toLowerCase())) {
        return item
      }
    }

    );
    setFilteredData(filtered);
  }, [filterQuery, cryptoData]);

  // Apply sorting
  useEffect(() => {
    if (sortConfig.key) {
      const sorted = [...filteredData].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
      setSortedData(sorted);
    } else {
      setSortedData(filteredData);
    }
  }, [sortConfig, filteredData]);

  // Handle sorting logic
  const handleSort = (key) => {
    setSortConfig((prevState) => ({
      key,
      direction:
        prevState.key === key && prevState.direction === "ascending"
          ? "descending"
          : "ascending",
    }));
  };

  // Pagination logic
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentPageData = sortedData.slice(
    startIndex,
    startIndex + rowsPerPage
  );

  const totalPages = Math.ceil(sortedData.length / rowsPerPage);

  return (


    <div class='' style={{overflowX:'auto'}}>
      {/* Filter Input */}
      <input
        type="text"
        placeholder="Search..."
        value={filterQuery}
        onChange={(e) => setFilterQuery(e.target.value)}
        style={{ marginBottom: "10px", padding: "8px" }}
      />

      {/* Table */}
      <table border="1" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th onClick={() => handleSort("name")}>Name</th>
            <th onClick={() => handleSort("age")}>Cripto Price</th>
            <th onClick={() => handleSort("location")}>Market Cap</th>
          </tr>
        </thead>
        <tbody>
          {currentPageData.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.current_price}</td>
              <td>{item.market_cap}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div style={{ marginTop: "10px" }}>
        <button class='btn rounded-5 border-black'
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          <FaAngleLeft />
        </button>
        <span style={{ margin: "0 10px" }}>
          Page {currentPage} of {totalPages}
        </span>
        <button class='btn rounded-5 border-black'
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          <FaAngleRight />
        </button>
        <select
          class='border rounded-3 p-1'
          value={rowsPerPage}
          onChange={(e) => setRowsPerPage(Number(e.target.value))}
          style={{ marginLeft: "10px" }}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
        </select>
      </div>
    </div>
  );
};

export default TableComponent;
