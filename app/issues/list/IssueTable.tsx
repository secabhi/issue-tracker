import { IssueStatusBadge } from "@/app/components";
import { Issue, Status } from "@prisma/client";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import { Table } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

export interface IssueQueryParams {
  status: Status;
  orderBy: keyof Issue;
  page: string;
}

interface Props {
  searchParams: IssueQueryParams;
  issues: Issue[];
}

const IssueTable = ({ issues, searchParams }: Props) => {
  return (
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
  );
};

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

export const columnNames = columns.map((e) => e.value);

export default IssueTable;
