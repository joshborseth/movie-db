import z from "zod";

export const createLikedMovieSchema = z.object({
  likerId: z.string(),
  id: z.number(),
  posterPath: z.string(),
  overview: z.string(),
  year: z.string(),
  title: z.string(),
  rating: z.number(),
});
