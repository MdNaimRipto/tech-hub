import UpdateUserInputField from "@/components/common/updateUserInputFields/UpdateUserInputField";
import { useUpdateUserMutation } from "@/redux/features/auth/userApis";
import { IUser } from "@/types/userTypes/userTypes";
import { useState } from "react";
import { toast } from "react-toastify";

const UserInfoAndUpdateFields = ({
  user,
  token,
}: {
  user: IUser | null;
  token: string | undefined;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [updateFields, setUpdateFields] = useState({
    name: false,
    email: false,
    contactNumber: false,
    password: false,
    street: false,
    city: false,
    district: false,
  });

  const userInfoFields = [
    {
      fieldName: "Name",
      fieldValue: user?.name,
      updateFieldName: "name",
      fieldState: updateFields.name,
      type: "text",
      placeholder: "Enter New User Name",
    },
    {
      fieldName: "Email",
      fieldValue: user?.email,
      updateFieldName: "email",
      fieldState: updateFields.email,
      type: "email",
      placeholder: "Enter New Email Address",
    },
    {
      fieldName: "Contact Number",
      fieldValue: user?.contactNumber,
      updateFieldName: "contactNumber",
      fieldState: updateFields.contactNumber,
      type: "tel",
      placeholder: "Enter New Contact Number",
    },
    {
      fieldName: "Password",
      fieldValue: "**********",
      updateFieldName: "password",
      fieldState: updateFields.password,
      type: "password",
      placeholder: "Enter New Password",
    },
    {
      fieldName: "Street",
      fieldValue:
        user?.street === "empty" ? "Please Add Street Info" : user?.street,
      updateFieldName: "street",
      fieldState: updateFields.street,
      type: "text",
      placeholder: "Enter Street Name",
    },
    {
      fieldName: "City",
      fieldValue: user?.city === "empty" ? "Please Add City Info" : user?.city,
      updateFieldName: "city",
      fieldState: updateFields.city,
      type: "text",
      placeholder: "Enter City Name",
    },
    {
      fieldName: "District",
      fieldValue:
        user?.district === "empty"
          ? "Please Add District Info"
          : user?.district,
      updateFieldName: "district",
      fieldState: updateFields.district,
      type: "text",
      placeholder: "Enter District Name",
    },
  ];
  const [updateUser] = useUpdateUserMutation();
  const handleUserUpdate = async (e: any, fieldName: string) => {
    e.preventDefault();
    setIsLoading(true);
    const form = e.target;
    const value = form.updateField.value;
    const option = {
      data: {
        [fieldName]: value,
      },
      id: user?._id,
      token: token,
    };
    try {
      const res = await updateUser(option).unwrap();
      if (res.success) {
        toast.success(res.message);
        setIsLoading(false);
        form.reset();
      }
    } catch (error: any) {
      toast.error(error?.data?.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 md:gap-8 mt-6 font-medium text-black ml-0 lg:ml-5">
      {userInfoFields.map((info, i) => (
        <div key={i} className="flex flex-wrap items-center w-full">
          <div className="w-full md:w-1/2">
            <p className="flex items-center">
              <span className="text-sm md:text-xl mr-4 block w-1/2">
                {info.fieldName}:
              </span>{" "}
              <span className="text-gray text-xs md:text-sm block w-1/2 py-[10px]">
                {info.fieldValue}
              </span>
            </p>
          </div>
          <UpdateUserInputField
            field={info.fieldState}
            fieldName={info.updateFieldName}
            type={info.type}
            setUpdateFields={setUpdateFields}
            handleUserUpdate={handleUserUpdate}
            placeholder={info.placeholder}
            isLoading={isLoading}
          />
        </div>
      ))}
    </div>
  );
};

export default UserInfoAndUpdateFields;
