import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Stack, Typography } from "@mui/material";
import { FormContextProvider } from "./contexts/FormContext";
import PermissionTable from "./components/Permission/Table";
import PermissionSubmitButton from "./components/Permission/SubmitButton";
const theme = createTheme({
  palette: {
    mode: "dark",
  },
});
// a tabela de permissões é compatível com os temas do material UI

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Stack spacing={2} alignItems="center" padding={2}>
          <Typography variant="h6">Tabela de Permissões</Typography>
          <FormContextProvider>
            <Stack spacing={2} alignItems="center" minWidth="50vw">
              <PermissionTable />
              <PermissionSubmitButton />
            </Stack>
          </FormContextProvider>
        </Stack>
      </ThemeProvider>
    </>
  );
}

export default App;
