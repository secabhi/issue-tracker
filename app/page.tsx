import Image from "next/image";
import Pagination from "./components/Pagination";
import { useSearchParams } from "next/navigation";
import LatestIssues from "./LatestIssues";

export default function Home({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  return (
    <LatestIssues />
    // <Pagination
    //   count={100}
    //   size={10}
    //   currentPage={parseInt(searchParams.page) || 1}
    // />
  );
}
