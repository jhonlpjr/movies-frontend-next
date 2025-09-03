"use client";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilm } from '@fortawesome/free-solid-svg-icons';
// ...existing code...
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useMovies, type Movie } from "@/features/movies/useMovies";
import { MovieCatalog } from "@/components/MovieCatalog";
import { MovieHeader } from "@/components/MovieHeader";
import { MovieFilters } from "@/components/MovieFilters";
import { MoviePagination } from "@/components/MoviePagination";
import { MovieFooter } from "@/components/MovieFooter";
import { MovieForm } from "@/components/MovieForm";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import { moviesService } from "@/services/moviesService";

interface MovieFormValues {
  title?: string | null | undefined;
  genre?: string[] | null;
  year?: number | null | undefined;
  rating?: number | null | undefined;
  popularity?: number | null | undefined;
  description?: string | null;
}

export default function MoviesPage() {
  // filtros UI
  const [genre, setGenre] = useState<string>("");
  const [yearFrom, setYearFrom] = useState<number | undefined>();
  const [yearTo, setYearTo] = useState<number | undefined>();
  const [rating, setRating] = useState<number>(0);
  const [sort, setSort] = useState<string>("popularity");
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);

  // filtros aplicados (lo que realmente se usa en el fetch)
  const [appliedFilters, setAppliedFilters] = useState({
    genre: "",
    yearFrom: undefined as number | undefined,
    yearTo: undefined as number | undefined,
    rating: undefined as number | undefined,
    sort: "popularity",
    page: undefined as number | undefined,
    limit: undefined as number | undefined,
    query: undefined as string | undefined,
  });

  // búsqueda (debounce)
  const [searchInput, setSearchInput] = useState("");
  useEffect(() => {
    if (searchInput.length === 0) {
      setAppliedFilters(f => ({ ...f, query: undefined }));
      return;
    }
    // Solo dispara si el largo es múltiplo de 3 y mayor a 0
    if (searchInput.length % 3 === 0 && searchInput.length > 0) {
      const t = setTimeout(() => {
        setAppliedFilters(f => ({ ...f, query: searchInput }));
      }, 400);
      return () => clearTimeout(t);
    }
    // Si no es múltiplo de 3, no borra el filtro
  }, [searchInput]);

  // datos
  const { data, isLoading, isError } = useMovies(appliedFilters.query ?? "", appliedFilters);
  const movies: Movie[] = Array.isArray(data?.data) ? (data!.data as Movie[]) : [];

  // react-query para invalidar tras mutaciones
  const qc = useQueryClient();

  // modales y acciones
  const [showCreate, setShowCreate] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [editMovie, setEditMovie] = useState<Movie | null>(null);
  const [showDelete, setShowDelete] = useState(false);
  const [deleteMovie, setDeleteMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(false);

  // ...existing code...

  const handleCreate = async (values: MovieFormValues) => {
    setLoading(true);
    try {
      const payload = {
        ...values,
        title: typeof values.title === "string" && values.title ? values.title : "",
        genre: Array.isArray(values.genre)
          ? values.genre
          : values.genre
            ? [values.genre]
            : values.genre === null
              ? null
              : undefined,
        year: values.year === null ? undefined : values.year,
        rating: values.rating === null ? undefined : values.rating,
        popularity: values.popularity === null ? undefined : values.popularity,
      };
      await moviesService.createMovie(payload);
      toast.success("Película creada");
      setShowCreate(false);
      qc.invalidateQueries({ queryKey: ["movies"] });
    } catch {
      toast.error("Error al crear");
    } finally { setLoading(false); }
  };

  const handleEdit = async (values: MovieFormValues) => {
    if (!editMovie?.id) return;
    setLoading(true);
    try {
      const payload = {
        ...values,
        title: typeof values.title === "string" && values.title ? values.title : "",
        genre: Array.isArray(values.genre)
          ? values.genre
          : values.genre
            ? [values.genre]
            : values.genre === null
              ? null
              : undefined,
        year: values.year === null ? undefined : values.year,
        rating: values.rating === null ? undefined : values.rating,
        popularity: values.popularity === null ? undefined : values.popularity,
      };
      await moviesService.updateMovie(editMovie.id, payload);
      toast.success("Película actualizada");
      setShowEdit(false);
      setEditMovie(null);
      qc.invalidateQueries({ queryKey: ["movies"] });
    } catch {
      toast.error("Error al actualizar");
    } finally { setLoading(false); }
  };

  const handleDelete = async () => {
    if (!deleteMovie?.id) return;
    setLoading(true);
    try {
      await moviesService.deleteMovie(deleteMovie.id);
      toast.success("Película eliminada");
      setShowDelete(false);
      setDeleteMovie(null);
      qc.invalidateQueries({ queryKey: ["movies"] });
    } catch {
      toast.error("Error al eliminar");
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[color:var(--color-base-100)]">
      <MovieHeader
        searchValue={searchInput}
        onSearchChange={e => setSearchInput(e.target.value)}
        onSearchKeyDown={e => {
          if (e.key === "Enter") {
            setAppliedFilters(f => ({ ...f, query: searchInput }));
          }
        }}
        onAddMovie={() => setShowCreate(true)}
      />
      <main className="flex flex-1 container mx-auto py-8 gap-8">
        <div className="w-full max-w-xs">
          {/* Filtros */}
          <MovieFilters
            genre={genre} setGenre={setGenre}
            yearFrom={yearFrom} setYearFrom={setYearFrom}
            yearTo={yearTo} setYearTo={setYearTo}
            rating={rating} setRating={setRating}
            sort={sort} setSort={setSort}
            limit={limit} setLimit={setLimit}
            onApply={() => {
              setAppliedFilters(f => ({
                ...f,
                genre,
                yearFrom: yearFrom || undefined,
                yearTo: yearTo || undefined,
                rating: rating || undefined,
                sort,
                page: page || undefined,
                limit: limit || undefined,
                query: f.query ?? undefined,
              }));
            }}
          />
        </div>

        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-2 text-black font-sans flex items-center gap-2">
            {/* FontAwesome React icon */}
            <FontAwesomeIcon icon={faFilm} className="text-black text-xl" /> Movies
          </h2>
          <p className="text-sm text-gray-500 mb-6">{movies.length} movies found</p>
          {isLoading && <p>Cargando…</p>}
          {isError && <p className="text-red-600">Ocurrió un error al cargar.</p>}

          <MovieCatalog
            movies={movies}
            onEdit={(m) => { setEditMovie(m); setShowEdit(true); }}
            onDelete={(m) => { setDeleteMovie(m); setShowDelete(true); }}
          />

          <MoviePagination page={page} setPage={setPage} totalPages={25} />
        </div>
      </main>
      <MovieFooter />

      {/* Create Modal */}
      {showCreate && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/10 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-lg p-6 min-w-[320px]">
            <h3 className="text-lg font-bold mb-4">Crear Película</h3>
            <MovieForm onSubmit={handleCreate} onCancel={() => setShowCreate(false)} loading={loading} />
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEdit && editMovie && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/10 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-lg p-6 min-w-[320px]">
            <h3 className="text-lg font-bold mb-4">Editar Película</h3>
            <MovieForm
              initialValues={{
                title: editMovie.title ?? "",
                genre: editMovie.genre ?? [],
                year: editMovie.year ?? undefined,
                rating: editMovie.rating ?? undefined,
                popularity: editMovie.popularity ?? undefined,
                description: editMovie.description ?? "",
              }}
              onSubmit={handleEdit}
              onCancel={() => { setShowEdit(false); setEditMovie(null); }}
              loading={loading}
            />
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      <ConfirmDialog
        open={showDelete && !!deleteMovie}
        title="Eliminar película"
        description={deleteMovie ? `¿Seguro que quieres eliminar "${deleteMovie.title}"?` : ""}
        onConfirm={handleDelete}
        onCancel={() => { setShowDelete(false); setDeleteMovie(null); }}
        loading={loading}
      />
    </div>
  );
}
