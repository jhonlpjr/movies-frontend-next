import { useQuery } from "@tanstack/react-query";
import { moviesService } from "@/services/moviesService";
import type { paths } from "@/lib/api/schema";

// Respuesta cruda del OpenAPI
type RawMoviesResponse =
  paths["/api/v1/movies/search"]["get"]["responses"]["200"]["content"]["application/json"];

// Tipo seguro de una película (data es array cuando no es null/undefined)
export type Movie = NonNullable<RawMoviesResponse["data"]>[number];

// Devolvemos una versión NORMALIZADA: siempre data: Movie[]
export type MoviesResponse = {
  data: Movie[];
  meta?: RawMoviesResponse["meta"];
};

export interface MoviesFilters {
  genre?: string;
  yearFrom?: number;
  yearTo?: number;
  rating?: number;
  sort?: string;
  page?: number;
  limit?: number;
}

export function useMovies(
  q?: string,
  filters?: MoviesFilters
) {
  return useQuery<MoviesResponse>({
    queryKey: ["movies", q, filters],
    queryFn: () => moviesService.getMovies(q, filters),
  });
}
