import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faHeart, faStar, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import React from "react";
import type { Movie } from "@/features/movies/useMovies";

interface MovieCatalogProps {
  movies: Movie[];
  onEdit?: (movie: Movie) => void;
  onDelete?: (movie: Movie) => void;
}

export const MovieCatalog: React.FC<MovieCatalogProps> = ({ movies, onEdit, onDelete }) => {
  return (
    <section className="py-8">
      <h2 className="text-3xl font-bold mb-6 text-black font-sans">Catálogo de Películas</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="bg-white rounded-2xl shadow p-0 flex flex-col border border-gray-200 hover:shadow-xl transition-shadow relative font-sans"
          >
            {/* Rating destacado en esquina */}
            <div className="absolute top-4 right-4 bg-gray-900 text-white text-xs font-bold px-2 py-1 rounded-lg z-10 shadow">
              {movie.rating}
            </div>
            {/* Placeholder de póster */}
            <div className="h-40 bg-gray-300 flex items-center justify-center text-gray-500 text-lg font-semibold rounded-t-2xl relative">
              Movie Poster
              {/* Íconos de acción sobre el póster, SIEMPRE visibles y con contraste */}
              <div className="absolute inset-0 flex items-center justify-center gap-4">
                <button className="bg-white rounded-full p-2 shadow hover:bg-gray-100 border border-gray-300">
                  <FontAwesomeIcon icon={faPlay} className="text-black text-lg" />
                </button>
                <button className="bg-white rounded-full p-2 shadow hover:bg-gray-100 border border-gray-300">
                  <FontAwesomeIcon icon={faHeart} className="text-red-500 text-lg" />
                </button>
              </div>
            </div>
            {/* Info de la película */}
            <div className="p-4 flex flex-col flex-1">
              <h3 className="text-base font-bold text-black mb-1">
                {movie.title}
              </h3>
              <p className="text-xs text-gray-700 mb-1">
                {movie.genre?.join(" · ")} {movie.year ? `· ${movie.year}` : ""}
              </p>
              <p className="text-xs text-gray-500 mb-2 line-clamp-2">
                {movie.description ?? "Sin descripción"}
              </p>
              <div className="flex items-center justify-between mt-auto pt-2">
                <span className="flex items-center gap-1 text-gray-900 text-sm font-semibold">
                  <FontAwesomeIcon icon={faStar} className="text-yellow-500" /> {movie.rating}/10
                </span>
                <div className="flex gap-2">
                  <button
                    className="text-gray-500 hover:text-blue-600"
                    title="Editar"
                    onClick={() => onEdit?.(movie)}
                  >
                    <FontAwesomeIcon icon={faPenToSquare} className="text-lg" />
                  </button>
                  <button
                    className="text-gray-500 hover:text-red-500"
                    title="Eliminar"
                    onClick={() => onDelete?.(movie)}
                  >
                    <FontAwesomeIcon icon={faTrash} className="text-lg" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
