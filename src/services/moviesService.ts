import { api } from "@/lib/api/client";
import type { MoviesFilters } from "@/features/movies/useMovies";
import type { paths, components } from "@/lib/api/schema";

type RawMovie =
  NonNullable<
    paths["/api/v1/movies/search"]["get"]["responses"][200]["content"]["application/json"]["data"]
  >[number];

type Movie = RawMovie;

type MoviesResponse = {
  data: Movie[];
  meta?: paths["/api/v1/movies/search"]["get"]["responses"][200]["content"]["application/json"]["meta"];
};

export const moviesService = {
  async getMovies(q?: string, filters?: MoviesFilters): Promise<MoviesResponse> {
    const queryParams = {
      query: q ?? undefined,
      genre: filters?.genre ?? undefined,
      yearFrom: filters?.yearFrom ?? undefined,
      yearTo:   filters?.yearTo   ?? undefined,
      rating:   filters?.rating   ?? undefined,
      sort:     filters?.sort     ?? undefined,
      limit:    filters?.limit    ?? undefined,
    };

    const query = Object.fromEntries(
      Object.entries(queryParams).filter(([, v]) => v !== undefined && v !== null && v !== "")
    );

  const { data, error } = await api.GET("/api/v1/movies/search", {
      params: { query },
    });

    if (error) throw error;

    return {
      data: (data?.data ?? []) as Movie[],
      meta: data?.meta,
    };
  },

  async getMovieById(id: string): Promise<Movie> {
  const { data, error } = await api.GET("/api/v1/movies/{id}", {
      params: { path: { id } },
    });
    if (error) throw error;
    return data as Movie;
  },

  async createMovie(payload: components["schemas"]["CreateMovieRequest"]): Promise<Movie> {
  const { data, error } = await api.POST("/api/v1/movies", { body: payload });
    if (error) throw error;
    return data!.data as Movie;
  },

  async updateMovie(
    id: string,
    payload: components["schemas"]["UpdateMovieRequest"]
  ): Promise<Movie> {
    const { data, error } = await api.PATCH("/api/v1/movies/{id}", {
      params: { path: { id } },
      body: payload,
    });
    if (error) throw error;
    return data!.data as Movie;
  },

  async deleteMovie(id: string): Promise<void> {
    const { error } = await api.DELETE("/api/v1/movies/{id}", {
      params: { path: { id } },
    });
    if (error) throw error;
  },
};
