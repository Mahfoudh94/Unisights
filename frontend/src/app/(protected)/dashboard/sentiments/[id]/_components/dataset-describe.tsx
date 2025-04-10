"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface DatasetDescribeProps {
  data: string[][];
}

type ColumnType = "Numeric" | "Categorical/Text";

interface ColumnStats {
  min: number | string;
  max: number | string;
  mean: number | string;
  median: number | string;
}

const DatasetDescribe: React.FC<DatasetDescribeProps> = ({ data }) => {
  if (!data || data.length < 2) {
    return <p>No data available</p>;
  }

  const [headers, ...rows] = data;

  // Detect column types
  const columnTypes: ColumnType[] = (headers!).map((_, colIndex) => {
    const values = rows.map((row) => row[colIndex]);
    const isNumeric = values.every(
      (value) => !isNaN(Number(value)) && value?.trim() !== "",
    );
    return isNumeric ? "Numeric" : "Categorical/Text";
  });

  // Compute statistics for numeric columns
  const computeStats = (values: string[]) => {
    const numericValues = values.map(Number).filter(v => !isNaN(v));
  
    if (numericValues.length === 0) {
      return { min: "-", max: "-", mean: "-", median: "-" };
    }
  
    numericValues.sort((a, b) => a - b);
  
    const mean = (numericValues.reduce((sum, val) => sum + val, 0) / numericValues.length).toFixed(2);
  
    const mid = Math.floor(numericValues.length / 2);
    let median: string;
  
    if (numericValues.length % 2 === 0) {
      const left = numericValues[mid - 1];
      const right = numericValues[mid];
  
      if (left !== undefined && right !== undefined) {
        median = ((left + right) / 2).toFixed(2);
      } else {
        median = "-"; // Fallback if indices are out of bounds
      }
    } else {
      median = numericValues[mid] !== undefined ? numericValues[mid].toFixed(2) : "-";
    }
  
    return {
      min: numericValues[0]?.toFixed(2) ?? "-",
      max: numericValues[numericValues.length - 1]?.toFixed(2) ?? "-",
      mean,
      median,
    };
  };
  

  return (
    <div className="rounded-md border p-4 shadow-md">
      <h2 className="mb-2 text-lg font-semibold">Dataset Summary</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Column</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Missing Values</TableHead>
            <TableHead>Unique Values</TableHead>
            <TableHead>Min</TableHead>
            <TableHead>Max</TableHead>
            <TableHead>Mean</TableHead>
            <TableHead>Median</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {headers?.map((colName, colIndex) => {
            const values = rows.map((row) => row[colIndex]);
            const uniqueValues = new Set(values).size;
            const missingValues = values.filter((value) => value?.trim() === "").length;
            const stats: ColumnStats =
              columnTypes[colIndex] === "Numeric"
                ? computeStats(values as string[])
                : { min: "-", max: "-", mean: "-", median: "-" };

            return (
              <TableRow key={colIndex}>
                <TableCell>{colName}</TableCell>
                <TableCell>{columnTypes[colIndex]}</TableCell>
                <TableCell>{missingValues}</TableCell>
                <TableCell>{uniqueValues}</TableCell>
                <TableCell>{stats.min}</TableCell>
                <TableCell>{stats.max}</TableCell>
                <TableCell>{stats.mean}</TableCell>
                <TableCell>{stats.median}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default DatasetDescribe;