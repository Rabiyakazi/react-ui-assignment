import React, { useState } from "react";

export interface Column<T> {
  key: string;
  title: string;
  dataIndex: keyof T;
  sortable?: boolean;
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  selectable?: boolean;
  onRowSelect?: (selectedRows: T[]) => void;
}

function DataTable<T extends { [key: string]: any }>({
  data,
  columns,
  loading = false,
  selectable = false,
  onRowSelect,
}: DataTableProps<T>) {
  const [sortKey, setSortKey] = useState<keyof T | null>(null);
  const [sortAsc, setSortAsc] = useState(true);
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());

  const handleSort = (key: keyof T) => {
    if (sortKey === key) setSortAsc(!sortAsc);
    else {
      setSortKey(key);
      setSortAsc(true);
    }
  };

  const handleSelectRow = (index: number) => {
    if (!selectable) return;
    const newSelected = new Set(selectedRows);
    if (newSelected.has(index)) newSelected.delete(index);
    else newSelected.add(index);
    setSelectedRows(newSelected);
    if (onRowSelect) onRowSelect(data.filter((_, i) => newSelected.has(i)));
  };

  const sortedData = React.useMemo(() => {
    if (!sortKey) return data;
    return [...data].sort((a, b) => {
      if (a[sortKey] > b[sortKey]) return sortAsc ? 1 : -1;
      if (a[sortKey] < b[sortKey]) return sortAsc ? -1 : 1;
      return 0;
    });
  }, [data, sortKey, sortAsc]);

  if (loading) return <div className="p-4 text-center">Loading...</div>;
  if (!data.length) return <div className="p-4 text-center">No data available</div>;

  return (
    <table className="min-w-full border border-gray-200">
      <thead>
        <tr>
          {selectable && <th className="border p-2">Select</th>}
          {columns.map((col) => (
            <th
              key={col.key}
              className="border p-2 cursor-pointer"
              onClick={() => col.sortable && handleSort(col.dataIndex)}
            >
              {col.title}
              {sortKey === col.dataIndex && (sortAsc ? " 🔼" : " 🔽")}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sortedData.map((row, index) => (
          <tr
            key={index}
            className={`border-b ${selectedRows.has(index) ? "bg-gray-100" : ""}`}
          >
            {selectable && (
              <td className="border p-2 text-center">
                <input
                  type="checkbox"
                  checked={selectedRows.has(index)}
                  onChange={() => handleSelectRow(index)}
                />
              </td>
            )}
            {columns.map((col) => (
              <td key={col.key} className="border p-2">
                {row[col.dataIndex]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default DataTable;
