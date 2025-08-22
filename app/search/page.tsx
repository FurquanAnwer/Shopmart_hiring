import { Suspense } from "react";
import SearchResults from "../components/SearchResults";
import Spinner from "../components/Spinner";

export default function SearchPage() {
  return (
    <Suspense fallback={<Spinner/>}>
      <SearchResults /> {/* Client component */}
    </Suspense>

  );
}
