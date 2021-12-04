import { TableCell, Checkbox } from "@mui/material";
import { useContext } from "react";
import FormContext from "../../contexts/FormContext";

export default function CellGroup({ label, expanded, type }) {
  const { state, dispatch } = useContext(FormContext);
  const { permissions, formState } = state;
  const isChecked = (permission) => {
    let element;
    let checked;
    switch (type) {
      case "submodule":
        element = formState.find((element) => {
          return (
            element.submodule === label && element.permission === permission
          );
        });
        return element.value;
      case "module":
        checked = formState
          .filter((element) => {
            return (
              element.module === label && element.permission === permission
            );
          })
          .every((element) => {
            return element.value === true;
          });
        return checked;
      case "all":
        checked = formState
          .filter((element) => {
            return element.permission === permission;
          })
          .every((element) => {
            return element.value === true;
          });
        return checked;

      default:
        return false;
    }
  };

  return (
    <>
      {expanded ? <TableCell /> : null}
      <TableCell align="left">{label}</TableCell>
      {permissions.map((permission) => {
        return (
          <TableCell key={permission} align="center">
            <Checkbox
              color="primary"
              checked={isChecked(permission)}
              onClick={(ev) =>
                dispatch({
                  type,
                  payload: { label, permission, value: ev.target.checked },
                })
              }
              inputProps={{ "aria-label": `${label} ${permission}` }}
            />
          </TableCell>
        );
      })}
    </>
  );
}
