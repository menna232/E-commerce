const mongoose = require('mongoose');
// 1- Create Schema
const categorySchema = new mongoose.Schema({
    name:{
      type : String ,
      required : [true , "category required"],
      unique : [true,"category must be unique"],
      minlength : [3 , "Too short"],
      maxlenght : [12 , "Too long categroy name"],
    } ,
    slug :{
      type: String,
      lowercase: true,
      
    },
    image :String,
  },
  {timestamps :true}
);

// 2- Create model
const CategoryModel = mongoose.model('Category', categorySchema);

module.exports = CategoryModel;
