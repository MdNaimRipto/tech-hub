import React from "react";

interface IGeneralInputField {
  label: string;
  placeHolder: string;
  type: string;
  name: string;
  commonClass: any;
  commonLabelClass: string;
  commonErrorClass: string;
  commonError: string;
  value: boolean;
  handleInputBlur: any;
}

const GeneralInputField = ({
  label,
  placeHolder,
  type,
  name,
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
        {label}{" "}
        {value && <span className={commonErrorClass}>{commonError}</span>}
      </label>
      <input
        name={name}
        id={name}
        type={type}
        placeholder={placeHolder}
        className={commonClass(value)}
        onBlur={handleInputBlur(name)}
        required
      />
    </div>
  );
};

export default GeneralInputField;
