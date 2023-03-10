import { type ReactNode, useId } from "react";

type Props = {
  rows: ({ [key: string]: unknown } & { id: string })[];
  columns: [string, string][];
  isLoading?: boolean;
};

function Table({ rows, columns, isLoading = false }: Props) {
  const id = useId();

  return (
    <table className="table w-full">
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={`${id}_${column[1]}`}>{column[1]}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {isLoading
          ? Array(6)
              .fill(0)
              .map((_, i) => (
                <tr key={`${id}_${i}`} className="h-4 animate-pulse">
                  {columns.map((column) => (
                    <td key={`${id}_${i}_${column[0]}`}></td>
                  ))}
                </tr>
              ))
          : rows.map((row) => (
              <tr key={`${id}_${row.id}`} className="py-2">
                {columns.map((column, index) => (
                  <td key={`${id}_${row.id}_${index}`}>
                    {row[column[0]] as ReactNode}
                  </td>
                ))}
              </tr>
            ))}
      </tbody>
    </table>
  );
}

export default Table;
