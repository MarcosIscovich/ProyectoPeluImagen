import InputBase from "@mui/material/InputBase";
import { styled } from "@mui/material/styles";
import { purple } from "@mui/material/colors";


 const TextFieldForms = styled(InputBase)(({ theme }) => ({
    "label + &": {
      marginTop: theme.spacing(3),
    },
    "& .MuiInputBase-input": {
      borderRadius: 6,
      position: "relative",
      backgroundColor: theme.palette.mode === "light" ? "#fcfcfb" : "#2b2b2b",
      border: "1px solid #ced4da",
      fontSize: 16,
      width: "full",
      padding: "10px 12px",
      transition: theme.transitions.create(["border-color", "background-color", "box-shadow"]),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(","),
      "&:focus": {
        boxShadow: purple[700],
        borderColor: purple[700],
      },
    },
  }));

  export default TextFieldForms;

