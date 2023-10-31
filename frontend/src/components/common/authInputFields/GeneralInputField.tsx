import React from "react";

interface IGeneralInputField {
  label: string;
  type: string;
  name: string;
  placeHolder: string;
  commonClass: any;
  commonLabelClass: string;
  commonErrorClass: string;
  commonError: string;
  value: boolean;
  handleInputBlur: any;
}

const GeneralInputField = ({
  label,
  type,
  name,
  placeHolder,
  commonLabelClass,
  commonErrorClass,
  commonError,
  value,
  commonClass,
  handleInputBlur,
}: IGeneralInputField) => {
  return (
    <div>
      <label className={commonLabelClass}>
        {label} <span className={commonErrorClass}>{value && commonError}</span>
      </label>
      <input
        name={name}
        id={name}
        type={type}
        placeholder={placeHolder}
        className={commonClass(value)}
        onBlur={handleInputBlur({ name })}
        required
      />
    </div>
  );
};

export default GeneralInputField;
