import React from "react";
import { categoryList } from "../../categoryList/CategoryList";

interface ICategoryFilter {
  setCategory: any;
  setPage: any;
}

const CategoryFilter = ({ setCategory, setPage }: ICategoryFilter) => {
  return (
    <select
      className="border border-light-gray p-2 rounded focus:outline-none cursor-pointer"
      defaultValue=""
      onChange={e => {
        setCategory(e.target.value);
        localStorage.setItem("category", JSON.stringify(e.target.value));
        localStorage.setItem("categoryPage", JSON.stringify(1));
        setPage(1);
      }}
    >
      <option value="">Select Category</option>
      {categoryList.map((o, i) => (
        <option key={i} value={o.value}>
          {o.name}
        </option>
      ))}
    </select>
  );
};

export default CategoryFilter;
