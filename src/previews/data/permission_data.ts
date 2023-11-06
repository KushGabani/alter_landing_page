import type { PermissionData } from "../components/permissions/permissions_column";

const modules = [
  "Inward",
  "Purchase",
  "Jobwork",
  "Outward",
  "Sales",
  "Designs",
  "Party",
];
const roles = [
  "Senior Data Entry",
  "Accountant",
  "CEO",
  "Stock Manager",
  "Production Manager",
  "Quality Control",
  "Sales Manager",
  "Customer Service",
  "Machine Operator",
  "Color Specialist",
  "Production Manager",
  "Director",
  "Worker",
];

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

const sampleData = [];

// Create sample data rows for each role
for (const role of roles) {
  const row: any = {
    role,
  };

  for (const permission of permissions) {
    // Assign random boolean values for each permission
    row[permission] = Math.random() < 0.5; // Randomly assign true or false
  }

  sampleData.push(row);
}

export const data = sampleData as PermissionData[];
