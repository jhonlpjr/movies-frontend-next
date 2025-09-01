import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilm, faSearch } from '@fortawesome/free-solid-svg-icons';
import React from "react";

export interface MovieHeaderProps {
  searchValue: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearchKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onAddMovie?: () => void;
}

export const MovieHeader: React.FC<MovieHeaderProps> = ({ searchValue, onSearchChange, onSearchKeyDown, onAddMovie }) => (
  <header className="flex items-center justify-between py-4 px-8 border-b bg-white">
    <div className="flex items-center gap-2">
  <span className="text-2xl font-bold"><FontAwesomeIcon icon={faFilm} className="mr-2" />MovieCatalog</span>
    </div>
    <div className="flex items-center gap-2">
      <div className="relative w-64">
        <input
          type="text"
          placeholder="Search movies..."
          className="border rounded px-3 py-1 w-full pr-10"
          value={searchValue}
          onChange={onSearchChange}
          onKeyDown={onSearchKeyDown}
        />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
          <FontAwesomeIcon icon={faSearch} />
        </span>
      </div>
      <button className="bg-black text-white px-4 py-1 rounded font-semibold" onClick={onAddMovie}>+ Add Movie</button>
    </div>
  </header>
);
