import { useUserContext } from "@/context/AuthContext";
import { Button } from "@mui/material";

const SubmitBtn = ({ title }: { title: string }) => {
  const { user } = useUserContext();
  return (
    <Button
      type="submit"
      disabled={!user && title === "Add Review"}
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
      {title}
    </Button>
  );
};

export default SubmitBtn;
