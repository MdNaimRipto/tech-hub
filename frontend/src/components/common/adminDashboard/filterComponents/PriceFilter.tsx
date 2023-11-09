import React from "react";

const PriceFilter = ({ setSortOrder }: { setSortOrder: any }) => {
  return (
    <select
      onChange={e => {
        setSortOrder(e.target.value);
      }}
      className="border border-light-gray p-2 rounded focus:outline-none cursor-pointer mr-3"
    >
      <option value="desc">High to Low</option>
      <option value="asc">Low to High</option>
    </select>
  );
};

export default PriceFilter;
