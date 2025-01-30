// !!!!!!!!!!!!!!!!!!!!!!!!!!!!
/*
{
  "name": "Inception",
  "rating": 9,
  "description": "A mind-bending sci-fi movie.",
  "genre": "Action",
  "cast": ["Leonardo DiCaprio", "Joseph Gordon-Levitt"]
}

*/

const { z } = require("zod");

const bodySchema = z.object({
  name: z.string().nonempty(),
  rating: z.number().min(0).max(10),
  description: z.string().nonempty(),
  genre: z.enum(["Action", "Comedy", "Drama", "Fantasy", "Horror", "Sci-Fi"]),
  cast: z.array(z.string().nonempty()).min(1),
});

const validation = (req, res, next) => {
  const result = bodySchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      status: "error",
      message: "Bad request! Validation failed.",
      errors: result.error.errors,
    });
  }

  next();
};

module.exports = { validation };
