
interface MovieFiltersProps {
  genre: string;
  setGenre: (g: string) => void;
  yearFrom?: number;
  setYearFrom: (y?: number) => void;
  yearTo?: number;
  setYearTo: (y?: number) => void;
  rating: number;
  setRating: (r: number) => void;
  sort: string;
  setSort: (s: string) => void;
  limit: number;
  setLimit: (l: number) => void;
  onApply: () => void;
}

export const MovieFilters: React.FC<MovieFiltersProps> = ({
  genre,
  setGenre,
  yearFrom,
  setYearFrom,
  yearTo,
  setYearTo,
  rating,
  setRating,
  sort,
  setSort,
  limit,
  setLimit,
  onApply,
}) => {
    return (
      <aside className="bg-white rounded-xl shadow p-6 mb-8 w-full max-w-xs absolute left-8 top-32">
      <h3 className="text-lg font-bold mb-4">Filters</h3>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Genre</label>
        <select className="w-full border rounded px-2 py-1" value={genre} onChange={e => setGenre(e.target.value)}>
          <option value="">All Genres</option>
          <option value="Action">Action</option>
          <option value="Drama">Drama</option>
          <option value="Sci-Fi">Sci-Fi</option>
          <option value="Crime">Crime</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Year</label>
        <div className="flex gap-2">
          <input type="number" placeholder="From" className="w-1/2 border rounded px-2 py-1" value={yearFrom ?? ""} onChange={e => setYearFrom(e.target.value ? Number(e.target.value) : undefined)} />
          <input type="number" placeholder="To" className="w-1/2 border rounded px-2 py-1" value={yearTo ?? ""} onChange={e => setYearTo(e.target.value ? Number(e.target.value) : undefined)} />
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Rating</label>
        <input type="range" min={0} max={10} className="w-full" value={rating} onChange={e => setRating(Number(e.target.value))} />
        <div className="text-xs text-right mt-1">{rating}</div>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Sort By</label>
        <select className="w-full border rounded px-2 py-1" value={sort} onChange={e => setSort(e.target.value)}>
          <option value="popularity">Popularity</option>
          <option value="year">Year</option>
          <option value="rating">Rating</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Limit</label>
        <input type="number" min={1} max={100} className="w-full border rounded px-2 py-1" value={limit} onChange={e => setLimit(Number(e.target.value))} />
      </div>
      <button className="w-full bg-black text-white py-2 rounded font-semibold mt-2" onClick={onApply}>Apply Filters</button>
    </aside>
  );
}
