import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fetchDataset } from "@/lib/utils";
import { type Dataset } from "@prisma/client";
import DatasetDescribe from "./dataset-describe";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

export default async function DatasetOverview({
  dataset,
}: {
  dataset: Dataset;
}) {
  // Fetch the dataset
  const data = await fetchDataset({
    datasetLink: dataset.filePath,
    type: dataset.type,
  });
  const dataHead = data.slice(0, 6);

  return (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList className="mb-4">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="preview">Preview</TabsTrigger>
        <TabsTrigger value="download">Download</TabsTrigger>
      </TabsList>

      {/* Overview Tab */}
      <TabsContent value="overview">
        <p className="text-sm text-muted-foreground">
          This dataset contains valuable data for machine learning models.
        </p>
      </TabsContent>

      <TabsContent value="preview" className="space-y-4">
        <div className="rounded border p-4">
          <h2 className="mb-2 text-lg font-semibold">The Head of the Data</h2>
          {/* Add a wrapper div with overflow-x-auto */}
          <Table>
            <TableBody>
              {dataHead.map((row, rowIndex) => (
                <TableRow key={rowIndex} className="border-b">
                  {row.map((cell, colIndex) => (
                    <TableCell key={colIndex} className="p-2">
                      {cell}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        {/* Pass the dataset to DatasetDescribe */}
        <DatasetDescribe data={data} />
      </TabsContent>

      {/* Download Tab */}
      <TabsContent value="download">
        <a
          href={dataset.filePath}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          Download Dataset
        </a>
      </TabsContent>
    </Tabs>
  );
}
