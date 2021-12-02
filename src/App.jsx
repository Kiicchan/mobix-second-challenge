import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Box } from "@mui/material";
import { FormContextProvider } from "./contexts/FormContext";
import PermissionTable from "./components/ui/PermissionTable";
const theme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box
          sx={{
            minHeight: "100vh",
            padding: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <FormContextProvider>
            <PermissionTable />
          </FormContextProvider>
        </Box>
      </ThemeProvider>
    </>
  );
}

export default App;
