import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";
import PermissionCells from "./Cells";
import { useContext } from "react";
import FormContext from "../../contexts/FormContext";
import ExpandableTableRow from "../ui/ExpandableTableRow";

export default function PermissionTable(props) {
  const { state } = useContext(FormContext);
  const { permissions, modules } = state;
  return (
    <TableContainer component={Paper}>
      <Table>
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
          <TableRow>
            <PermissionCells label="Todos" expanded />
          </TableRow>
          {modules.map((module) => {
            return (
              <ExpandableTableRow key={module.name}>
                <PermissionCells label={module.name}></PermissionCells>
              </ExpandableTableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
