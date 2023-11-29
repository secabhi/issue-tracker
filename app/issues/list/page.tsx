import prisma from "@/prisma/client";
import { Table } from "@radix-ui/themes";
import { IssueStatusBadge } from "@/app/components";
import IssueActions from "./IssueActions";
import { Issue, Status } from "@prisma/client";
import Link from "next/link";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import Pagination from "@/app/components/Pagination";

interface Props {
  searchParams: { status: Status; orderBy: keyof Issue; page: string };
}

const IssuesPage = async ({ searchParams }: Props) => {
  console.log(searchParams.status);

  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const columns: {
    label: string;
    value: keyof Issue;
    sortOrder: string;
    className?: string;
  }[] = [
    {
      label: "Issue",
      value: "title",
      sortOrder: "asc",
    },
    {
      label: "Status",
      value: "status",
      sortOrder: "asc",
      className: "hidden md:table-cell",
    },
    {
      label: "Created",
      value: "createdAt",
      sortOrder: "asc",
      className: "hidden md:table-cell",
    },
  ];

  const orderBy = columns
    .map((column) => column.value)
    .includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: "asc" }
    : undefined;

  const where = { status };

  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;

  const issues = await prisma.issue.findMany({
    where,
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const issueCount = await prisma.issue.count({ where });

  return (
    <div>
      <IssueActions />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            {columns.map((e) => (
              <Table.ColumnHeaderCell key={e.value} className={e.className}>
                <Link
                  href={{
                    query: {
                      ...searchParams,
                      orderBy: e.value,
                      sortOrder: e.sortOrder,
                    },
                  }}
                >
                  {e.label}
                </Link>
                {e.value === searchParams.orderBy && (
                  <ArrowUpIcon className="inline" />
                )}
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((e) => (
            <Table.Row key={e.id}>
              <Table.Cell>
                <Link href={`/issues/${e.id}`}>{e.title}</Link>
                <div className="block md:hidden">
                  <IssueStatusBadge status={e.status} />
                </div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <IssueStatusBadge status={e.status} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {e.createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
      <Pagination size={pageSize} currentPage={page} count={issueCount} />
    </div>
  );
};

export const dynamic = "force-dynamic";

export default IssuesPage;
