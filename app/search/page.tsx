import { Suspense } from "react";
import SearchResults from "../components/SearchResults";
import Spinner from "../components/Spinner";
import SkeletonGrid from "../components/SkeletonGrid";

export default function SearchPage() {
  return (
    <Suspense fallback={<SkeletonGrid/>}>
      <SearchResults /> {/* Client component */}
    </Suspense>

  );
}
