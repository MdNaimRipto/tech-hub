import { TbTruckDelivery } from "react-icons/tb";
import { RiExchangeDollarLine } from "react-icons/ri";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import PaymentIcon from "@mui/icons-material/Payment";

const SmallInfo = () => {
  const infos = [
    {
      icon: <TbTruckDelivery className="text-5xl text-secondary" />,
      title: "Free Shipping",
      info: "On Order Over $99",
    },
    {
      icon: <RiExchangeDollarLine className="text-5xl text-secondary" />,
      title: "Money Return",
      info: "7 Days Money Return",
    },
    {
      icon: <SupportAgentIcon sx={{ fontSize: "48px", color: "#f15700" }} />,
      title: "Support 24/7",
      info: (
        <span>
          Hotline (
          <a href="tel:+8801632970990" className="hover:text-secondary">
            +8801632970990
          </a>
          )
        </span>
      ),
    },
    {
      icon: <PaymentIcon sx={{ fontSize: "48px", color: "#f15700" }} />,
      title: "Safe Payment",
      info: "Protect Online Payment",
    },
  ];
  return (
    <div className="hidden lg:grid grid-cols-1 md:grid-cols-4 items-center justify-items-center gap-4 mb-16 py-8 border border-light-gray container px-4">
      {infos.map((info, i) => (
        <div key={i + 1} className="flex items-center gap-4">
          <>{info.icon}</>
          <div>
            <h5 className="font-medium text-black text-base xl:text-lg">
              {info.title}
            </h5>
            <p className="text-gray text-xs xl:text-sm font-light">
              {info.info}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SmallInfo;
