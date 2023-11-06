import { createColumnHelper } from "@tanstack/react-table";

const modules = ["Inward", "Purchase", "Jobwork", "Outward", "Sales"];

const permissions = modules.flatMap((module) => [
  `read${module}Processes`,
  `create${module}Challans`,
  `create${module}Bills`,
  `update${module}Challans`,
  `update${module}Bills`,
  `delete${module}Challans`,
  `delete${module}Bills`,
  `manage${module}Module`,
]);

export type PermissionData = {
  role: string;
} & { [key in (typeof permissions)[number]]: boolean };

const columnHelper = createColumnHelper<PermissionData>();

export const columns = [
  columnHelper.accessor("role", {
    header: () => <></>,
    cell: (info) => <span>{info.getValue()}</span>,
  }),
  ...permissions.map((permissionName) =>
    columnHelper.accessor(permissionName, {
      header: () => <span>{capitalizeFirstLetter(permissionName)}</span>,
      cell: (info) => <CheckboxComponent checked={info.getValue()} />,
    })
  ),
];

const CheckboxComponent = ({ checked }: { checked: boolean }) => {
  return (
    <div className="w-full flex-center my-1">
      <input
        defaultChecked={checked}
        type="checkbox"
        className="form-checkbox rounded text-tremor-brand"
      />
    </div>
  );
};

function capitalizeFirstLetter(text: string) {
  const result = text.replace(/([A-Z])/g, " $1");
  return result.charAt(0).toUpperCase() + result.slice(1);
}
