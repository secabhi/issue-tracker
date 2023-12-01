"use client";
import { Card } from "@radix-ui/themes";
import React from "react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

interface Props {
  open: number;
  inProgress: number;
  closed: number;
}

const IssueChart = ({ open, inProgress, closed }: Props) => {
  const statuses: { label: string; value: number; status: string }[] = [
    {
      label: "Open",
      value: open,
      status: "OPEN",
    },
    {
      label: "In Progress",
      value: inProgress,
      status: "IN_PROGRESS",
    },
    {
      label: "Closed",
      value: closed,
      status: "CLOSED",
    },
  ];
  return (
    <Card>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={statuses}>
          <XAxis dataKey="label" />
          <YAxis />
          <Bar
            dataKey="value"
            barSize={60}
            style={{ fill: "var(--accent-9)" }}
          />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default IssueChart;
