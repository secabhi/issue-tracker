import Image from "next/image";
import Pagination from "./components/Pagination";
import { useSearchParams } from "next/navigation";

export default function Home({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  return (
    <Pagination
      count={100}
      size={10}
      currentPage={parseInt(searchParams.page) || 1}
    />
  );
}
