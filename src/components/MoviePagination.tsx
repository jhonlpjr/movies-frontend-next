
interface MoviePaginationProps {
  page: number;
  setPage: (p: number) => void;
  totalPages: number;
}

export const MoviePagination: React.FC<MoviePaginationProps> = ({ page, setPage, totalPages }) => {
  const pages = [1, 2, 3, '...', totalPages];
    return (
      <nav className="flex items-center justify-center gap-2 mt-16 mb-8" aria-label="Pagination">
      <button className="px-3 py-1 rounded border" disabled={page === 1} onClick={() => setPage(page - 1)}>&lt;</button>
      {pages.map((p, i) =>
        typeof p === 'number' ? (
          <button
            key={`page-${p}`}
            className={`px-3 py-1 rounded border ${page === p ? 'bg-black text-white' : ''}`}
            onClick={() => setPage(p)}
          >
            {p}
          </button>
        ) : (
          <span key={`ellipsis-${i}`} className="px-3 py-1">{p}</span>
        )
      )}
      <button className="px-3 py-1 rounded border" disabled={page === totalPages} onClick={() => setPage(page + 1)}>&gt;</button>
    </nav>
  );
};
