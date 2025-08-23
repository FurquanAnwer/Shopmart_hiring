import { SkeletonCard } from "./SkeletonCard"

export default function SkeletonGrid() {
  const arr = new Array(12).fill(null) // fill array with values

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {arr.map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  )
}
