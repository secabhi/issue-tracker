"use client";
import Skeleton from "@/app/components/Skeleton";
import { Issue, User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
  const {
    data: users,
    error,
    isLoading,
  } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => axios.get<User[]>("/api/users").then((res) => res.data),
    staleTime: 60 * 1000,
    retry: 3,
  });

  if (isLoading) {
    return <Skeleton />;
  }

  if (error) {
    return null;
  }

  return (
    <>
      <Select.Root
        defaultValue={
          !issue.assignedToUserId ? "unassigned" : issue.assignedToUserId
        }
        onValueChange={(userId) => {
          axios
            .patch("/api/issues/" + issue.id, {
              assignedToUserId: userId === "unassigned" ? null : userId,
            })
            .catch((err) => {
              toast.error("Something went wrong");
            });
        }}
      >
        <Select.Trigger placeholder="Assign..."></Select.Trigger>
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            <Select.Item value="unassigned">Unassigned</Select.Item>
            {users?.map((e) => (
              <Select.Item key={e.id} value={e.id}>
                {e.name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  );
};

export default AssigneeSelect;
