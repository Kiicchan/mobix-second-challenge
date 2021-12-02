import { TableCell, Checkbox } from "@mui/material";
import { useContext } from "react";
import FormContext from "../../contexts/FormContext";

export default function PermissionCells({ label, expanded }) {
  const { state } = useContext(FormContext);
  const { permissions } = state;
  return (
    <>
      {expanded ? <TableCell /> : null}
      <TableCell align="center">{label}</TableCell>
      {permissions.map((permission) => {
        return (
          <TableCell key={permission} align="center">
            <Checkbox defaultChecked />
          </TableCell>
        );
      })}
    </>
  );
}
