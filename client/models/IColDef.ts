export interface IColDef<T> {
  field: string;
  headerName: string;
  width?: number;
  height?: number;
  editable?: boolean;
  renderCell?: (prop: string, item: T) => any;
}
