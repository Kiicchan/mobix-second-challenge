import ExpandableTableRow from "../ui/ExpandableTableRow";
import PermissionCells from "./Cells";
import SubModuleList from "./SubModuleList";

export default function ModuleRow({ module }) {
  return (
    <ExpandableTableRow
      key={module.name}
      expandComponent={<SubModuleList submodules={module.submodules} />}
    >
      <PermissionCells label={module.name}></PermissionCells>
    </ExpandableTableRow>
  );
}
