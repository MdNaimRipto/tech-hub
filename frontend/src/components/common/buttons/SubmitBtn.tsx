import { Button } from "@mui/material";

const SubmitBtn = ({ title }: { title: string }) => {
  return (
    <Button
      sx={{
        background: "linear-gradient(#f15700, #ff7a1a) !important",
        color: "#ffffff",
        paddingX: 3,
        paddingY: "10px",
      }}
    >
      {title}
    </Button>
  );
};

export default SubmitBtn;
