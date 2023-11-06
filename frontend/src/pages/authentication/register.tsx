import { useContext, useState } from "react";
import Link from "next/link";
import AuthenticationBtn from "@/components/common/buttons/AuthenticationBtn";
import PasswordInputField from "@/components/common/authInputFields/PasswordInputField";
import GeneralInputField from "@/components/common/authInputFields/GeneralInputField";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import CryptoJS from "crypto-js";
import { envConfig } from "@/config/envConfig";
import { UserContext } from "@/context/AuthContext";
import { useRouter } from "next/router";
import { useUserRegisterMutation } from "@/redux/features/auth/authApis";

const Register = () => {
  const { setToken } = useContext(UserContext);

  const [isLoading, setIsLoading] = useState(false);
  const [isPassHidden, setIsPassHidden] = useState(true);

  const router = useRouter();

  const [value, setValue] = useState({
    name: false,
    email: false,
    contact: false,
    password: false,
  });

  const [userRegister] = useUserRegisterMutation();

  const handleRegister = async (e: any) => {
    e.preventDefault();

    setIsLoading(true);

    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const contact = form.contact.value;
    const password = form.password.value;

    const registerOption = {
      data: {
        name: name,
        email: email,
        contactNumber: contact,
        password: password,
      },
    };

    try {
      const res = await userRegister(registerOption).unwrap();
      if (res.success) {
        setToken(res.data);
        const secretKey = envConfig.secret_key;
        const encryptedToken = CryptoJS.AES.encrypt(
          JSON.stringify(res?.data),
          String(secretKey)
        ).toString();
        Cookies.set("token", encryptedToken, { expires: 14 });
        router.push("/user/profile");
        toast.success(res?.message);
        form.reset();
        setIsLoading(false);
      }
    } catch (error: any) {
      toast.error(error?.data?.message);
      setIsLoading(false);
    }
  };

  const handleInputBlur =
    (fieldName: string) => (e: { target: { value: any } }) => {
      setValue({
        ...value,
        [fieldName]: !e.target.value,
      });
    };

  const commonClass = (isInvalid: boolean) =>
    `w-full py-[10px] px-2 text-sm rounded my-2 outline-none border ${
      isInvalid
        ? "border-error placeholder:text-error"
        : "border-light-gray placeholder:text-gray"
    }`;

  const commonLabelClass = `text-black font-medium text-sm`;
  const commonErrorClass = `text-error text-xs`;

  return (
    <div className="pageBg lg:bg-cover lg:bg-no-repeat lg:bg-center lg:h-screen w-full">
      <div className="lg:grid grid-cols-3 container px-4 items-center h-full">
        <div className="col-span-2"></div>
        <div className="py-12 lg:py-0 lg:my-16 w-full">
          <form onSubmit={handleRegister} className="mb-5">
            <h3 className="text-3xl text-black font-medium mb-3">Register</h3>
            <p className="text-sm font-medium text-light-gray mb-3">
              Welcome to Tech-Mart. Please Register to gain full access to this
              website.
            </p>
            <GeneralInputField
              name="name"
              type="name"
              label="User Name"
              commonClass={commonClass}
              commonLabelClass={commonLabelClass}
              commonError="User Name is Required"
              commonErrorClass={commonErrorClass}
              handleInputBlur={handleInputBlur}
              placeHolder="Enter User Name"
              value={value.name}
            />
            <GeneralInputField
              name="email"
              type="email"
              label="Email Address"
              commonClass={commonClass}
              commonLabelClass={commonLabelClass}
              commonError="Email is Required"
              commonErrorClass={commonErrorClass}
              handleInputBlur={handleInputBlur}
              placeHolder="Enter Email Address"
              value={value.email}
            />
            <GeneralInputField
              name="contact"
              type="contact"
              label="Contact Number"
              commonClass={commonClass}
              commonLabelClass={commonLabelClass}
              commonError="Contact Number is Required"
              commonErrorClass={commonErrorClass}
              handleInputBlur={handleInputBlur}
              placeHolder="Enter Contact Number"
              value={value.contact}
            />
            <PasswordInputField
              commonClass={commonClass}
              commonLabelClass={commonLabelClass}
              commonErrorClass={commonErrorClass}
              handleInputBlur={handleInputBlur}
              isPassHidden={isPassHidden}
              setIsPassHidden={setIsPassHidden}
              value={value}
            />
            <AuthenticationBtn title="Register Now" loading={isLoading} />
          </form>
          <p className="text-sm text-black font-medium">
            Already Have An Account?{" "}
            <Link
              href="/authentication/login"
              className="text-[#2f4eb4] hover:text-secondary duration-300"
            >
              Login Now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
