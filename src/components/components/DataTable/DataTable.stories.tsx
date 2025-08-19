import type { Meta, StoryFn } from "@storybook/react";
import DataTable from "./DataTable";
import type { DataTableProps, Column } from "./DataTable";

interface User {
  id: number;
  name: string;
  age: number;
}

const columns: Column<User>[] = [
  { key: "id", title: "ID", dataIndex: "id", sortable: true },
  { key: "name", title: "Name", dataIndex: "name", sortable: true },
  { key: "age", title: "Age", dataIndex: "age", sortable: true },
];

const data: User[] = [
  { id: 1, name: "Alice", age: 25 },
  { id: 2, name: "Bob", age: 30 },
  { id: 3, name: "Charlie", age: 22 },
];

export default {
  title: "Components/DataTable",
  component: DataTable,
} as Meta<typeof DataTable>;

const Template: StoryFn<DataTableProps<User>> = (args: DataTableProps<User>) => <DataTable {...args} />;

export const Default = Template.bind({});
Default.args = {
  data,
  columns,
};

export const Selectable = Template.bind({});
Selectable.args = {
  data,
  columns,
  selectable: true,
  onRowSelect: (rows) => console.log("Selected:", rows),
};

export const Loading = Template.bind({});
Loading.args = {
  data: [],
  columns,
  loading: true,
};
