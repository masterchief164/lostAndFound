import { createTheme } from "@mui/material";

const theme = createTheme({
    palette: {
        primary: {
            main: "#000"
        },
        secondary: {
            main: "#fff"
        }
    },
    typography: {
        fontFamily: "Nunito Sans"
    },
    tabs: {
        fontSize: "100"
    }
});

export default theme;
