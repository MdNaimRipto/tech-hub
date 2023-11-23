import { envConfig } from "@/config/envConfig";
import { useUserContext } from "@/context/AuthContext";
import { Button } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

const SubmitBtn = ({
  title,
  isLoading,
}: {
  title: string;
  isLoading: boolean;
}) => {
  const { user } = useUserContext();
  return (
    <Button
      type="submit"
      disabled={
        (!user && title === "Add Review") ||
        (user?.uid === envConfig.admin_uid && title === "Add Review")
      }
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
        title
      )}
    </Button>
  );
};

export default SubmitBtn;
