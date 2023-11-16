import React from "react";
import { uploadImage } from "../uploadImage/uploadImage";

interface IInputType {
  name: string;
  label: string;
  required: boolean;
  setImg: any;
}

const ProductImageFiled = ({ name, label, required, setImg }: IInputType) => {
  return (
    <div className="mb-5">
      <div className="mb-3 flex items-center gap-1">
        <label>{label}</label>
        {required && (
          <span className="text-error text-xl font-semibold">*</span>
        )}
      </div>
      <input
        type="file"
        name={name}
        required={required}
        accept="image/*"
        multiple={false}
        className="w-full p-2 rounded border border-light-gray focus:outline-none"
        onChange={(e: any) => {
          uploadImage({ img: e.target.files[0], setImg });
        }}
      />
    </div>
  );
};

export default ProductImageFiled;
