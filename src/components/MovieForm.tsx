import { useState } from "react";
import type { components } from "@/lib/api/schema";
import { Button } from "@/components/ui/button";

export interface MovieFormProps {
  initialValues?: Partial<components["schemas"]["CreateMovieRequest"]>;
  onSubmit: (
    values:
      | components["schemas"]["CreateMovieRequest"]
      | components["schemas"]["UpdateMovieRequest"]
  ) => void;
  onCancel: () => void;
  loading?: boolean;
}

export const MovieForm: React.FC<MovieFormProps> = ({
  initialValues = {},
  onSubmit,
  onCancel,
  loading,
}) => {
  const [title, setTitle] = useState(initialValues.title ?? "");
  const [genre, setGenre] = useState(initialValues.genre?.[0] ?? "");
  const [year, setYear] = useState(initialValues.year ?? "");
  const [rating, setRating] = useState(initialValues.rating ?? "");
  const [popularity, setPopularity] = useState(initialValues.popularity ?? "");
  const [description, setDescription] = useState(
    initialValues.description ?? ""
  );

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit({
          title,
          genre: genre ? [genre] : [],
          year: year ? Number(year) : undefined,
          rating: rating ? Number(rating) : undefined,
          popularity: popularity ? Number(popularity) : undefined,
          description,
        });
      }}
    >
      <div className="flex items-center gap-2">
        <label className="w-24 font-medium text-right" htmlFor="title">
          Title:
        </label>
        <input
          id="title"
          className="border rounded px-2 py-1 flex-1"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="flex items-center gap-2">
        <label className="w-24 font-medium text-right" htmlFor="genre">
          Genre:
        </label>
        <input
          id="genre"
          className="border rounded px-2 py-1 flex-1"
          placeholder="Genre"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          required
        />
      </div>
      <div className="flex items-center gap-2">
        <label className="w-24 font-medium text-right" htmlFor="year">
          Year:
        </label>
        <input
          id="year"
          className="border rounded px-2 py-1 flex-1"
          type="number"
          placeholder="Year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          required
        />
      </div>
      <div className="flex items-center gap-2">
        <label className="w-24 font-medium text-right" htmlFor="rating">
          Rating:
        </label>
        <input
          id="rating"
          className="border rounded px-2 py-1 flex-1"
          type="number"
          placeholder="Rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          required
        />
      </div>
      <div className="flex items-center gap-2">
        <label className="w-24 font-medium text-right" htmlFor="popularity">
          Popularity:
        </label>
        <input
          id="popularity"
          className="border rounded px-2 py-1 flex-1"
          type="number"
          placeholder="Popularity"
          value={popularity}
          onChange={(e) => setPopularity(e.target.value)}
        />
      </div>
      <div className="flex items-center gap-2">
        <label className="w-24 font-medium text-right" htmlFor="description">
          Description:
        </label>
        <textarea
          id="description"
          className="border rounded px-2 py-1 flex-1"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="flex gap-2 justify-end">
        <Button
          variant="outline"
          onClick={onCancel}
          className="w-28 transition-colors duration-200 hover:bg-muted hover:text-foreground"
          disabled={loading}
          data-cancel
        >
          Cancel
        </Button>
        {/* <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button> */}
        {/* <Button type="submit" disabled={loading}>{loading ? "Saving..." : "Save"}</Button> */}
          <Button
            variant="outline"
            type="submit"
            className="w-28 transition-colors duration-200 hover:bg-muted hover:text-foreground"
            disabled={loading}>{loading ? "Saving..." : "Save"}
          </Button>
      </div>
    </form>
  );
};
