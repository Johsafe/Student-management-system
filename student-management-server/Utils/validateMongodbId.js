const mongoose = require("mongoose");
const validateMongoDbId = (id) => {
  const isValid = mongoose.Types.ObjectId.isValid(id);
  // if (!isValid) throw new Error("This id is not valid or not Found");
  if(!isvalid){
    res.status(500).send({
      success: false,
      message: " This id is not valid or not Found.",
      error: error.message,
    });
  }
};
module.exports = validateMongoDbId;
