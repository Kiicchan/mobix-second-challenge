import { TableRow } from "@mui/material";
import CellGroup from "./CellGroup";

export default function SubModuleList({ submodules }) {
  return (
    <>
      {submodules.map((submodule) => {
        return (
          <TableRow
            aria-label={submodule}
            key={submodule}
            sx={{ bgcolor: "background.paper" }}
          >
            <CellGroup label={submodule} expanded type="submodule" />
          </TableRow>
        );
      })}
    </>
  );
}
