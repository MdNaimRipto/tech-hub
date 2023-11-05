import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/EditOutlined";
import UpdateUserInfoBtn from "@/components/common/buttons/UpdateUserInfoBtn";
import CloseIcon from "@mui/icons-material/Close";

interface IUpdateFields {
  setUpdateFields: any;
  field: boolean;
  fieldName: string;
  handleUserUpdate: any;
  type: string;
  placeholder: string;
}

const UpdateUserInputField = ({
  setUpdateFields,
  field,
  fieldName,
  handleUserUpdate,
  type,
  placeholder,
}: IUpdateFields) => {
  return (
    <div className="flex items-center gap-4">
      {!field ? (
        <Tooltip title="Update This Field">
          <IconButton
            sx={{ background: "#e2e2e2", color: "#ff7a1a" }}
            onClick={() => {
              setUpdateFields((prevUpdateFields: any) => ({
                ...prevUpdateFields,
                [fieldName]: true,
              }));
            }}
          >
            <EditIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Close Update Filed">
          <IconButton
            sx={{ background: "#e2e2e2", color: "#ff7a1a" }}
            onClick={() => {
              setUpdateFields((prevUpdateFields: any) => ({
                ...prevUpdateFields,
                [fieldName]: false,
              }));
            }}
          >
            <CloseIcon />
          </IconButton>
        </Tooltip>
      )}
      {field && (
        <form
          onSubmit={(e: any) => {
            handleUserUpdate(e, fieldName);
          }}
          className="flex items-center justify-between gap-4"
        >
          <input
            type={type}
            id="updateField"
            name="updateField"
            className="border border-light-gray px-2 py-1 focus:outline-none rounded w-[155px] md:w-[200px] lg:w-full"
            placeholder={placeholder}
          />
          <UpdateUserInfoBtn />
        </form>
      )}
    </div>
  );
};

export default UpdateUserInputField;
