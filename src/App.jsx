import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Box, Stack } from "@mui/material";
import { FormContextProvider } from "./contexts/FormContext";
import PermissionTable from "./components/Permission/Table";
import PermissionSubmitButton from "./components/Permission/SubmitButton";
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
        <Stack spacing={2}>
          <FormContextProvider>
            <Stack spacing={2} alignItems="center">
              <PermissionTable />
              <PermissionSubmitButton />
              <Box></Box>
            </Stack>
          </FormContextProvider>
        </Stack>
      </ThemeProvider>
    </>
  );
}

export default App;
