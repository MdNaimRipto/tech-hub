import React from "react";

interface ICategoryList {
  setProductCategory: any;
  required: boolean;
}

const ProductCategoryList = ({
  setProductCategory,
  required,
}: ICategoryList) => {
  return (
    <select
      className="w-full p-2 rounded border border-light-gray focus:outline-none mb-3"
      onChange={e => {
        setProductCategory(e.target.value);
      }}
      required={required}
    >
      <option value="">Select Category</option>
      <option value="LAPTOP">Laptop</option>
      <option value="CPU">Processor</option>
      <option value="COOLER">CPU Cooler</option>
      <option value="MOTHERBOARD">Motherboard</option>
      <option value="RAM">RAM</option>
      <option value="STORAGE">Storage</option>
      <option value="GPU">Graphics Card</option>
      <option value="PSU">Power Supply</option>
      <option value="CASING">Casing</option>
      <option value="MONITOR">Monitor</option>
      <option value="KEYBOARD">Keyboard</option>
      <option value="MOUSE">Mouse</option>
      <option value="CONSOLE">Console</option>
      <option value="CONTROLLER">Controller</option>
    </select>
  );
};

export default ProductCategoryList;
