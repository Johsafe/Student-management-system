//uploading image via cloudinary api
const dotenv = require("dotenv");
const cloudinaryModule = require("cloudinary");
// const cloudinary = require("cloudinary").v2;

dotenv.config();
const cloudinary = cloudinaryModule.v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

module.exports = cloudinary;