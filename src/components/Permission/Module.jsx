import ExpandableTableRow from "../ui/ExpandableTableRow";
import CellGroup from "./CellGroup";
import SubModuleList from "./SubModuleList";

export default function ModuleRow({ module }) {
  return (
    <ExpandableTableRow
      key={module.name}
      sx={{ bgcolor: "divider" }}
      expandComponent={<SubModuleList submodules={module.submodules} />}
      aria-label={module.name}
    >
      <CellGroup label={module.name} type="module" />
    </ExpandableTableRow>
  );
}
