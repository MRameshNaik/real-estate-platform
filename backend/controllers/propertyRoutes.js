const express = require("express");
const router = express.Router();
const multer = require("multer");

const Property = require("../models/property");
// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Set the destination for the uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Set the file name
  }
});
const upload = multer({ storage: storage });

// Create Property
router.post("/property", upload.single('image'), async (req, res) => {
  try {
    const newProperty = new Property({
      ...req.body,
      image: req.file.path // Save the path to the uploaded image
    });
    await newProperty.save();
    res.status(201).json(newProperty);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/property/:property_id", async (req,res) => {
  const { property_id } = req.params;
  try {
    let property = await Property.findById(property_id);
    if (!property) {
      return res.status(404).json({ error: "Property not found" });
    }
    return res.json({success: true, property: property});
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
// Get All Properties
router.get("/property", async (req, res) => {
  try {
    const properties = await Property.find();
    res.json(properties);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete Property
router.delete("/property/:property_id", async (req, res) => {
  const { property_id } = req.params;
  try {
    const property = await Property.findById(property_id);
    if (!property) {
      return res.status(404).json({ error: "Property not found" });
    }
    await Property.findByIdAndDelete(property_id);
    res.json({ message: "Property deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update Property
router.put("/property/:property_id", upload.single('image'), async (req, res) => {
  const { property_id } = req.params;
  try {
    let property = await Property.findById(property_id);
    if (!property) {
      return res.status(404).json({ error: "Property not found" });
    }

    // Update property fields
    property.set(req.body);

    // If a new image is uploaded, update the image path
    if (req.file) {
      property.image = req.file.path;
    }

    await property.save();
    res.json(property);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
