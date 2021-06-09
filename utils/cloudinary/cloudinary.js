const cloudinary = require("cloudinary");
const config = require("config");

cloudinary.config({
  cloud_name: config.get("cloudinary_cloud_name"),
  api_key: config.get("cloudinary_api_key"),
  api_secret: config.get("cloudinary_api_secret"),
});

module.exports = cloudinary;
