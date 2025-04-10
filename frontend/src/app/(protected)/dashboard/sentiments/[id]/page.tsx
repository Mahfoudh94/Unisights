import {
  BreadcrumbMaker,
  type BreadcrumbType,
} from "@/components/breadcrumb-maker";
import { Heading } from "@/components/ui/heading";
import { notFound } from "next/navigation";
import { getDatasetById } from "@/data/sentiments";
import DatasetOverview from "./_components/dataset-overview";
// import DatasetOverview from "@/components/dataset-overview";

const breadcrumbItems: BreadcrumbType[] = [
  { title: "Dashboard", href: "/dashboard", disabled: false, type: "link" },
  {
    title: "Datasets",
    href: "/dashboard/datasets",
    disabled: false,
    type: "link",
  },
  { title: "Dataset Overview", disabled: false, type: "text" },
];

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const dataset = await getDatasetById(params.id);
  if (!dataset) return notFound();

  return (
    <div className="flex-1 space-y-4 p-5">
      <BreadcrumbMaker items={breadcrumbItems} />
      <div className="flex justify-between">
        <div className="space-y-2">
          <Heading title={dataset.name} description="Explore your dataset." />
          <div className="text-sm text-muted-foreground">
            <span>
              Created: {new Date(dataset.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
      <DatasetOverview dataset={dataset} />
    </div>
  );
}
