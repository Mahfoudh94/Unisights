import {
  BreadcrumbMaker,
  type BreadcrumbType,
} from "@/components/breadcrumb-maker";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import Link from "next/link";
import { columns } from "./columns";
import { getAllUsers } from "@/data/user";

const breadcrumbItems: BreadcrumbType[] = [
  { title: "Admin", href: "/admin", disabled: false, type: "link" },
  { title: "Users", disabled: false, type: "text" },
];

export default async function OrdersPage() {
  const users = await getAllUsers();

  return (
    <div className="flex-1 space-y-4 p-5">
      <BreadcrumbMaker items={breadcrumbItems} />
      <div className="flex justify-between">
        <div className="space-y-4">
          <Heading
            title="User Management"
            description="Manage the user list through this page. Add, edit, and delete users."
          />
        </div>
        <Button asChild>
          <Link href="/admin/users/create">Create New User</Link>
        </Button>
      </div>
      <DataTable columns={columns} data={users} filterColumn="name" />
    </div>
  );
}
