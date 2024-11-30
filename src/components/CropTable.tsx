import React from "react";
import { ScrollArea, Table, Title } from "@mantine/core";

/**
 * Reusable table component for displaying crop data
 * @param title - The title for the table
 * @param headers - The column headers
 * @param rows - The data rows to be displayed in the table
 * @param columns - The columns to render in each row
 */
interface CropTableProps {
  title: string;
  headers: string[];
  rows: any[];
  columns: string[];
}

const CropTable: React.FC<CropTableProps> = ({ title, headers, rows, columns }) => {
  return (
    <div>
      <Title order={3} mb="sm" mt="sm" style={{ textAlign: 'center' }}>{title}</Title>
      <ScrollArea style={{ height: "70vh", width: "100%" }}>
      <Table stickyHeader striped highlightOnHover withTableBorder withColumnBorders style={{ width: "100%" }}>
        <Table.Thead>
          <Table.Tr>
            {headers.map((header, index) => (
              <Table.Th key={index}>{header}</Table.Th>
            ))}
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {rows.map((row, index) => (
            <Table.Tr key={index}>
              {columns.map((col, idx) => (
                <Table.Td key={idx}>{row[col]}</Table.Td>
              ))}
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
      </ScrollArea>
    </div>
  );
};

export default CropTable;
