import { MdOutlineShoppingCart } from "react-icons/md";

const CommonLoader = () => {
  return (
    <div className="h-screen flex items-center justify-center">
      <MdOutlineShoppingCart className="animate-pulse  duration-500 text-primary bg-[#ffa50054] text-4xl rounded-full w-12 h-12 p-2" />
    </div>
  );
};

export default CommonLoader;
