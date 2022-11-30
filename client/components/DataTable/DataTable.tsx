import React, { FC } from 'react';
import { getNestedProperty } from '../../utils';

interface DataTableProps {
  titles: string[];
  data: any[];
  properties: string[];
  renderItems?: [{ prop: string, renderFn: any }];
}

const DataTable: FC<DataTableProps> = ({ titles, data, properties, renderItems }) => {


  return (
    <div
      /*className = {`flex `}*/
    >
      <table
        className = 'w-full table-auto border-collapse  border border-slate-500'
      >
        <thead>
        <tr>
          {
            titles.map((title) => (
              <th
                className = 'border border-slate-600'
                key = {title}
              >
                {title}
              </th>
            ))
          }
        </tr>
        </thead>
        <tbody>
        {
          data.map((item, i) => (
            <tr
              key = {i}
            >
              <>
                {
                  properties.map((prop, i) => {
                    if (renderItems) {
                      const index = renderItems.findIndex(r => r.prop === prop);
                      if (~index) {
                        return (
                          <th
                            key = {prop + i}
                          >
                            {renderItems[index].renderFn(getNestedProperty(item, prop), item)}
                          </th>
                        );
                      }
                    }

                    return (
                      <th
                        className = 'border border-slate-600'
                        key = {prop + i}
                      >
                        {getNestedProperty(item, prop)}
                      </th>
                    );
                  })
                }
              </>
            </tr>
          ))
        }
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
