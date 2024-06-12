const mongoose = require("mongoose");

const UserImageSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  image_url: { type: String },
});

const UserImage = mongoose.model("UserImage", UserImageSchema);

module.exports = UserImage;
