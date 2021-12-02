import { TableRow } from "@mui/material";
import PermissionCells from "./Cells";

export default function SubModuleList({ submodules }) {
  return (
    <>
      {submodules.map((submodule) => {
        return (
          <TableRow key={submodule} sx={{ bgcolor: "background.paper" }}>
            <PermissionCells label={submodule} expanded />
          </TableRow>
        );
      })}
    </>
  );
}
