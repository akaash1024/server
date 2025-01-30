// !!!!!!!!!!!!!!!!!!!!!!!!!!!!
/*
{
  "id": 1,
  "name": "Inception",
  "rating": 9.0,
  "description": "A mind-bending sci-fi movie.",
  "genre": "Sci-Fi",
  "cast": ["Leonardo DiCaprio", "Joseph Gordon-Levitt"]
}

*/

const { z } = require("zod");

const bodySchema = z.object({
  id: z.number(),
  name: z.string().nonempty(),
  rating: z.number().min(0),
  description: z.string().nonempty(),
  genre: z.string().nonempty(),
  cast: z.array(z.string().min(1)),
});

const validation = (req, res, next) => {
  const result = bodySchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      status: "error",
      message: "Bad request! Validation failed.",
      errors: result.error.errors, // Access the validation errors
    });
  }

  next();
};

module.exports = { validation };
