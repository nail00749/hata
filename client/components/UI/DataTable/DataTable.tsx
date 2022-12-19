import React from 'react';
import { getNestedProperty } from '../../../utils';
import { IColDef } from '../../../models/IColDef';

interface DataTableProps<T> {
  rows: any[],
  columns: IColDef<T>[]
  /*getRowId: (...args: any) => string | number*/
}

const DataTable = <T extends object>({ columns, rows }: DataTableProps<T>) => {
  const colLenght = `grid-cols-${columns.length}`;

  return (
    <div
      className = {'flex flex-col border-2 p-2 rounded-xl'}
    >
      <div
        className = {`grid ${colLenght}  gap-2`}
      >
        {
          columns.map((column) => (
            <div
              className = 'my-2 border-r-2'
              key = {column.field}
            >
              {column.headerName}
            </div>
          ))
        }
      </div>
      <div
        className = {`grid ${colLenght} gap-2 grid-rows-2 gap-2`}
      >
        {
          rows.map((row) => {
            return columns.map((col) => {
              const key = row.id + col.headerName;
              if (col.renderCell) {
                return (
                  <div
                    className = 'border-r-2 p-1 border-t-2'
                    key = {key}
                  >
                    {col.renderCell(getNestedProperty(row, col.field), row)}
                  </div>
                );
              }
              return (
                <div
                  className = 'border-r-2 p-1 border-t-2'
                  key = {key}
                >
                  {getNestedProperty(row, col.field)}
                </div>
              );
            });
          })
        }
      </div>
    </div>
  );
};

export default DataTable;
