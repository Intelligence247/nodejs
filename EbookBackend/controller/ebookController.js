const Ebook = require("../models/ebookmodel");
const asyncHandler = require("express-async-handler");
const { genrateUniqueId } = require("../utils");

// create an Ebook

const createEbook = asyncHandler(async (req, res) => {
  const {
    name,
    overview,
    long_description,
    price,
    rating,
    poster,
    inStock,
    bestSeller,
    size,
  } = req.body;

  const existing = await Ebook.findOne({ name });
  if (existing) {
    res.status(400);
    throw new Error("Book name already in use");
  }

  if (
    !name ||
    !overview ||
    !long_description ||
    !price ||
    !rating ||
    !poster ||
    !size
  ) {
    res.status(400);
    throw new Error("All fields are required");
  }

  if (rating < 0 || rating > 5) {
    res.status(400);
    throw new Error("Rating should be in between 1 - 5");
  }

  const id = await genrateUniqueId();

  const ebook = new Ebook({
    id,
    name,
    overview,
    long_description,
    price,
    rating,
    poster,
    size,
    in_stock: inStock || true,
    best_seller: bestSeller || false,
  });

  const savedEbook = await ebook.save();
  res.status(201).json(savedEbook);
});

const updateEbook = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const ebook = await Ebook.findOne({ id });
    if (ebook) {
      ebook.price = req.body.price || ebook.price;
      ebook.poster = req.body.poster || ebook.poster;
      ebook.overview = req.body.overview || ebook.overview;
      ebook.rating = req.body.rating || ebook.rating;
      ebook.in_stock = req.body.in_stock || ebook.in_stock;
      ebook.long_description =
        req.body.long_description || ebook.long_description;
      ebook.best_seller = req.body.best_seller || ebook.best_seller;
      const updateEbook = await ebook.save();
      res.status(200).json(updateEbook);
    } else {
      res.status(500).json({ error: "Ebook not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});
const getAllEbook = asyncHandler(async (req, res) => {
  const ebooks = await Ebook.find().sort();
  if (!ebooks) {
    res.status(500);
    throw new Error("Something went wrong");
  }
  res.status(200).json(ebooks);
});

const getAnEbook = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const ebook = await Ebook.findOne({ id });

  if (ebook) {
    const {
      _id,
      id,
      name,
      overview,
      long_description,
      price,
      rating,
      poster,
      inStock,
      bestSeller,
      size,
    } = ebook;

    res.status(200).json({
      _id,
      id,
      name,
      overview,
      long_description,
      price,
      rating,
      poster,
      inStock,
      bestSeller,
      size,
    });
  } else {
    res.status(400);
    throw new Error("Ebook not found");
  }
});

module.exports = { createEbook, updateEbook, getAllEbook, getAnEbook };
