import { IconButton, Tooltip } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

interface IPasswordInputField {
  commonClass: any;
  commonLabelClass: string;
  commonErrorClass: string;
  value: {
    password: boolean;
  };
  isPassHidden: boolean;
  setIsPassHidden: any;
  handleInputBlur: any;
}

const PasswordInputField = ({
  commonLabelClass,
  commonErrorClass,
  value,
  isPassHidden,
  setIsPassHidden,
  commonClass,
  handleInputBlur,
}: IPasswordInputField) => {
  return (
    <div>
      <label className={commonLabelClass}>
        Password{" "}
        {value.password && (
          <span className={commonErrorClass}>`Password Required!`</span>
        )}
      </label>
      <div className="relative">
        <input
          name="password"
          id="password"
          type={isPassHidden ? "password" : "text"}
          placeholder="Enter Password"
          className={commonClass(value.password)}
          onBlur={handleInputBlur("password")}
          required
          autoComplete="off"
        />
        <div className="absolute top-1/2 -translate-y-1/2 right-3">
          {isPassHidden ? (
            <Tooltip title="Show Password">
              <IconButton
                onClick={() => {
                  setIsPassHidden(false);
                }}
              >
                <VisibilityIcon sx={{ color: "#1C1C1C", fontSize: "20px" }} />
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip title="Hide Password">
              <IconButton
                onClick={() => {
                  setIsPassHidden(true);
                }}
              >
                <VisibilityOffIcon
                  sx={{ color: "#1C1C1C", fontSize: "20px" }}
                />
              </IconButton>
            </Tooltip>
          )}
        </div>
      </div>
    </div>
  );
};

export default PasswordInputField;
