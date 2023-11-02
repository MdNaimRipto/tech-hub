import { useContext, useState } from "react";
import Link from "next/link";
import AuthenticationBtn from "@/components/common/buttons/AuthenticationBtn";
import { useUserLoginMutation } from "@/redux/features/auth/authApis";
import PasswordInputField from "@/components/common/authInputFields/PasswordInputField";
import GeneralInputField from "@/components/common/authInputFields/GeneralInputField";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import CryptoJS from "crypto-js";
import envConfig from "@/config/envConfig";
import { UserContext } from "@/context/AuthContext";
import { useRouter } from "next/router";

const Login = () => {
  const { setToken } = useContext(UserContext);

  const [isLoading, setIsLoading] = useState(false);
  const [isPassHidden, setIsPassHidden] = useState(true);

  const router = useRouter();

  const [value, setValue] = useState({
    email: false,
    password: false,
  });

  const [userLogin] = useUserLoginMutation();

  const handleLogin = (e: any) => {
    e.preventDefault();

    setIsLoading(true);

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    const loginOption = {
      data: {
        email,
        password,
      },
    };

    userLogin(loginOption).then(async (res: any) => {
      console.log(res);
      if (res && res?.data) {
        const data = res.data;
        toast.success(data.message);
        setToken(data.data);
        const secretKey = envConfig.secret_key;
        const encryptedToken = CryptoJS.AES.encrypt(
          JSON.stringify(data.data),
          String(secretKey)
        ).toString();
        Cookies.set("token", encryptedToken, { expires: 14 });
        form.reset();
        setIsLoading(false);
        router.push("/");
      } else if (res && res?.error) {
        const error = res.error.data;
        toast.error(error.message);
        setIsLoading(false);
      }
    });
  };

  const handleInputBlur =
    (fieldName: string) => (e: { target: { value: any } }) => {
      setValue({
        ...value,
        [fieldName]: !e.target.value,
      });
    };

  const commonClass = (isInvalid: boolean) =>
    `w-full py-[10px] px-2 text-sm rounded my-3 outline-none border ${
      isInvalid
        ? "border-error placeholder:text-error"
        : "border-light-gray placeholder:text-gray"
    }`;

  const commonLabelClass = `text-black font-medium text-sm`;
  const commonErrorClass = `text-error text-xs`;

  return (
    <div className="pageBg lg:bg-cover lg:bg-no-repeat lg:bg-center lg:h-screen w-full">
      <div className="lg:grid grid-cols-3 container px-4 items-center h-full md:w-3/5 lg:w-full">
        <div className="col-span-2"></div>
        <div className="py-12 lg:py-0 lg:my-16 w-full">
          <form onSubmit={handleLogin} className="mb-7">
            <h3 className="text-3xl text-black font-medium mb-5">Login</h3>
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
            <PasswordInputField
              commonClass={commonClass}
              commonLabelClass={commonLabelClass}
              commonErrorClass={commonErrorClass}
              handleInputBlur={handleInputBlur}
              isPassHidden={isPassHidden}
              setIsPassHidden={setIsPassHidden}
              value={value}
            />
            <AuthenticationBtn title="Login Now" loading={isLoading} />
          </form>
          <p className="text-sm text-black font-medium">
            {"Don't Have An Account?"}{" "}
            <Link
              href="/authentication/register"
              className="text-[#2f4eb4] hover:text-secondary duration-300"
            >
              Register Now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
