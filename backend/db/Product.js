const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
  },
  company: {
    type: String,
  },
});

module.exports=mongoose.model("products",productSchema);//Product is the name of the collection in the database and productSchema is the schema of the collection.