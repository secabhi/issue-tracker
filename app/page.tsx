import Image from "next/image";
import Pagination from "./components/Pagination";

export default function Home() {
  return <Pagination count={100} size={10} currentPage={10} />;
}
