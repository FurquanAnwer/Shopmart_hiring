import { SkeletonCard } from "./SkeletonCard"

export default function SkeletonGrid() {
  const arr = new Array(20).fill(null) // fill array with values

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 m-2">
      {arr.map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  )
}
