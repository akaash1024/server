const express = require("express");
const { MovieModel } = require("../model/movie.model");
const { validation } = require("../middleware/validation");

const movieRouter = express.Router();

// Get all movies
movieRouter.get("/", async (req, res) => {
  try {
    const movies = await MovieModel.find();
    res.status(200).send({ msg: "There are the details of all the movies", movies });
  } catch (error) {
    res.status(500).send({ msg: "Something went wrong", error: error.message });
  }
});

// Add a new movie
movieRouter.post("/", validation, async (req, res) => {
  const payload = req.body;
  try {
    const newMovie = new MovieModel(payload);
    await newMovie.save();
    res.status(201).send({ msg: "New Movie Added to db", movie: newMovie });
  } catch (error) {
    res.status(500).send({ msg: "Something went wrong", error: error.message });
  }
});

// Update an existing movie (PATCH)
movieRouter.patch("/:id", validation, async (req, res) => {
  const { id } = req.params;
  try {
    const updatedMovie = await MovieModel.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedMovie) {
      return res.status(404).send({ msg: "Movie not found" });
    }
    res.status(200).send({ msg: "Movie updated successfully", movie: updatedMovie });
  } catch (error) {
    res.status(500).send({ msg: "Something went wrong", error: error.message });
  }
});

// Delete a movie (DELETE)
movieRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedMovie = await MovieModel.findByIdAndDelete(id);
    if (!deletedMovie) {
      return res.status(404).send({ msg: "Movie not found" });
    }
    res.status(200).send({ msg: "Movie deleted successfully", movie: deletedMovie });
  } catch (error) {
    res.status(500).send({ msg: "Something went wrong", error: error.message });
  }
});

module.exports = { movieRouter };
