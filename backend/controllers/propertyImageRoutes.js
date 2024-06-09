// propertyImageRoutes.js

const express = require("express");
const router = express.Router();

const PropertyImage = require("../models/propertyImage");

// Create Property Image
router.post("/property-image", async (req, res) => {
  try {
    const newPropertyImage = new PropertyImage(req.body);
    await newPropertyImage.save();
    res.status(201).json(newPropertyImage);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get All Property Images
router.get("/property-image", async (req, res) => {
  try {
    const propertyImages = await PropertyImage.find();
    res.json(propertyImages);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete Property Image
router.delete("/property-image/:propertyImage_id", async (req, res) => {
  const { propertyImage_id } = req.params;
  try {
    const propertyImage = await PropertyImage.findById(propertyImage_id);
    if (!propertyImage) {
      return res.status(404).json({ error: "Property Image not found" });
    }
    await PropertyImage.findByIdAndDelete(propertyImage_id);
    res.json({ message: "Property Image deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update Property Image
router.put("/property-image/:propertyImage_id", async (req, res) => {
  const { propertyImage_id } = req.params;
  try {
    let propertyImage = await PropertyImage.findById(propertyImage_id);
    if (!propertyImage) {
      return res.status(404).json({ error: "Property Image not found" });
    }
    propertyImage = await PropertyImage.findByIdAndUpdate(propertyImage_id, req.body, { new: true });
    res.json(propertyImage);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;