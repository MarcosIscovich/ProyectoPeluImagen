
import { styled } from "@mui/material/styles";
import { purple } from "@mui/material/colors";
import Button from "@mui/material/Button";

const ButtonPurple = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: purple[500],
    "&:hover": {
      backgroundColor: purple[700],
    },
    marginRight: "5px",
  }));

 export default ButtonPurple;