import { createTheme } from "@mui/material/styles";
import { grey } from "@mui/material/colors";

const theme = createTheme({
    palette: {
        background: {
            default: grey[200],
        },
        primary: {
            main: "#03A9F4",
        },
        secondary: {
            main: "#FF5722",
        },
    },
});

export default theme;
