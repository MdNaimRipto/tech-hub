import React from "react";

interface IInputType {
  type: string;
  name: string;
  placeholder: string;
  label: string;
}

const ProductsInputField = ({ name, type, placeholder, label }: IInputType) => {
  return (
    <div className="mb-5">
      <div className="mb-3 flex items-center gap-1">
        <label>{label}</label>
        <span className="text-error text-xl font-semibold">*</span>
      </div>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        className="w-full px-2 py-3 rounded border border-light-gray focus:outline-none"
        required
      />
    </div>
  );
};

export default ProductsInputField;
