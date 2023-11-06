import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { TanStackTable } from "./components/global";
import {
  columns,
  type PermissionData,
} from "./components/permissions/permissions_column";
import { data } from "./data/permission_data";

const PermissionsPage: React.FC = () => {
  const table = useReactTable<PermissionData>({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <TanStackTable<PermissionData>
      table={table}
      loading={false}
      showHeading={true}
      stickyColumn={true}
      customHeading={
        <h2 className="text-lg font-medium pl-8 pt-4 pb-2">
          Roles & Permissions
        </h2>
      }
    />
  );
};

export default PermissionsPage;
