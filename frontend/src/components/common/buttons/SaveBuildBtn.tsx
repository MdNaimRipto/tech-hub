import { PcBuilderOptions } from "@/components/pcBuilderComponents/PcBuilderOptions";
import { useUserContext } from "@/context/AuthContext";
import { useUploadBuildMutation } from "@/redux/features/pc-builds/pcBuildApis";
import { Button } from "@mui/material";
import { toast } from "react-toastify";
import { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";

const SaveBuildBtn = ({ buildName }: { buildName: string }) => {
  const { user, token } = useUserContext();
  const { products, setProducts } = PcBuilderOptions();

  const [isLoading, setIsLoading] = useState(false);

  const cpu = products?.find(p => p.category === "CPU");
  const cooler = products?.find(p => p.category === "COOLER");
  const motherboard = products?.find(p => p.category === "MOTHERBOARD");
  const ram = products?.find(p => p.category === "RAM");
  const storage = products?.find(p => p.category === "STORAGE");
  const psu = products?.find(p => p.category === "PSU");
  const gpu = products?.find(p => p.category === "GPU");
  const casing = products?.find(p => p.category === "CASING");
  const monitor = products?.find(p => p.category === "MONITOR");
  const keyboard = products?.find(p => p.category === "KEYBOARD");
  const mouse = products?.find(p => p.category === "MOUSE");
  const headphone = products?.find(p => p.category === "HEADPHONE");

  const requiredFields = cpu || motherboard || ram || storage || psu || casing;

  const [uploadBuild] = useUploadBuildMutation();

  const handleSaveBuild = async () => {
    setIsLoading(true);
    const option = {
      data: {
        userID: user?._id,
        buildName: buildName,
        build: {
          ...(cpu && { cpu: cpu._id }),
          ...(cooler && { cooler: cooler._id }),
          ...(motherboard && { motherboard: motherboard._id }),
          ...(ram && { ram: ram._id }),
          ...(storage && { storage: storage._id }),
          ...(psu && { psu: psu._id }),
          ...(gpu && { gpu: gpu._id }),
          ...(casing && { casing: casing._id }),
          ...(monitor && { monitor: monitor._id }),
          ...(keyboard && { keyboard: keyboard._id }),
          ...(mouse && { mouse: mouse._id }),
          ...(headphone && { headphone: headphone._id }),
        },
      },
      token: token,
    };

    try {
      const res = await uploadBuild(option).unwrap();
      if (res.success) {
        setProducts([]);
        toast.success(res.message);
        localStorage.removeItem("pc-builder-products");
        setIsLoading(false);
      }
    } catch (error: any) {
      console.log("Error:", error);
      toast.error(error.data.message);
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleSaveBuild}
      type="submit"
      disabled={!user || !requiredFields || !buildName}
      sx={{
        background: "linear-gradient(#f15700, #ff7a1a) !important",
        color: "#ffffff",
        paddingX: 3,
        paddingY: "10px",
        "&:disabled": {
          color: "#686464",
          background: "#e2e2e2 !important",
        },
      }}
    >
      {isLoading ? (
        <CircularProgress sx={{ color: "#ffffff", marginLeft: 1 }} size={24} />
      ) : (
        "Save Build"
      )}
    </Button>
  );
};

export default SaveBuildBtn;
