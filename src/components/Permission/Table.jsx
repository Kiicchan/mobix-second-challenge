import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";
import CellGroup from "./CellGroup";
import { useContext } from "react";
import FormContext from "../../contexts/FormContext";
import ModuleRow from "./Module";

export default function PermissionTable(props) {
  const { state } = useContext(FormContext);
  const { permissions, modules } = state;
  return (
    <TableContainer component={Paper}>
      <Table size="medium" padding="checkbox" aria-label="permission table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell />
            {permissions.map((permission) => {
              return (
                <TableCell key={permission} align="center">
                  {permission}
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow sx={{ bgcolor: "text.disabled" }}>
            <CellGroup label="Todos" expanded type="all" />
          </TableRow>
          {modules.map((module) => {
            return <ModuleRow key={module.name} module={module} />;
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
