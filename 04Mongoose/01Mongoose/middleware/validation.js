const { z } = require("zod");

// Schema definition
const bodySchema = z.object({
  name: z.string().trim().nonempty({ message: "Name is required" }),
  rating: z
    .number()
    .min(0, { message: "Rating must be at least 0" })
    .max(10, { message: "Rating cannot be more than 10" }),
  description: z
    .string()
    .trim()
    .nonempty({ message: "Description is required" }),
  genre: z.enum(["Action", "Comedy", "Drama", "Fantasy", "Horror", "Sci-Fi"], {
    message:
      "Genre must be one of: Action, Comedy, Drama, Fantasy, Horror, Sci-Fi",
  }),
  cast: z
    .array(
      z
        .string()
        .trim()
        .nonempty({ message: "Each cast member must have a name" })
    )
    .min(1, { message: "At least one cast member is required" }),
});

// Middleware function
const validation = (req, res, next) => {
  const result = bodySchema.safeParse(req.body);


  // TODO
  
  if (!result.success) {
    return res.status(400).json({
      status: "error",
      message: "Validation failed",
      errors: result.error.errors.map((err) => ({
        field: err.path.join("."), // Show which field has an issue
        message: err.message, // Show the validation error message
      })),
    });
  }

  next(); // Move to the next middleware if validation passes
};

module.exports = { validation };
