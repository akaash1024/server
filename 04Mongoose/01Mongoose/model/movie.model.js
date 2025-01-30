const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    rating: { type: Number, required: true, min: 0, max: 10 },
    description: { type: String, required: true, trim: true },
    genre: {
      type: String,
      enum: ["Action", "Comedy", "Drama", "Fantasy", "Horror", "Sci-Fi"],
      required: true,
      trim: true,
    },
    cast: {
      type: [String],
      required: true,
      validate: {
        validator: (value) => value.length > 0,
        message: "Cast must contain at least one actor.",
      },
    },
  },
  { timestamps: true }
);

const MovieModel = mongoose.model("Movie", movieSchema);
module.exports = { MovieModel };
