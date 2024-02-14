const CategoryModel = require('../models/categoryModel');
const slugify = require('slugify')
const asyncHandler=require('express-async-handler')

// desc : get list of categories
// route : GET / api / v1 /categories
// accesss : public
exports.getCategories = asyncHandler(
  async (req, res) => {
    // categories pagiation 
  const page = req.query.page *1 || 1 
  const limit = req.query.limit *1 || 5
  const skip = (page - 1) * limit  
  const categories = await CategoryModel.find({}).skip(skip).limit(limit)  
  res.status(200).json({results : categories.lenght , page ,data : categories})
  })

// desc : get specific category from the database  
// params : categoryName 
// route : GET / api / v1 /categories
// accesss : public
exports.getSpecificCategory = asyncHandler(async (req, res) => {
  const {categoryName} = req.params;
  const categories = await CategoryModel.find({})
  const filteredCategories = categories.filter((category) =>
    category.name === categoryName)
  if(filteredCategories.length === 0 ){
    res.status(400).json({msg :`did not find ${categoryName}`}) 
  }
  else{
        res.status(200).json({ data: filteredCategories});
      }
})

// desc : add new category
// route : POST / api / v1 /categories
// accesss : private 
exports.createCategory = asyncHandler( async (req, res) =>{
      const name = req.body.name;  
      const category =await CategoryModel.create({name , slug : slugify(name)})
      res.status(201).json({data:category})   
})

// desc : update specific category
// route : PUT / api / v1 /categories
// accesss : private 
// params  : catID

exports.updateCategory = asyncHandler(
  async (req,res) =>{
    const {id} =req.params
    const {name} = req.body
    const category =await CategoryModel.findOneAndUpdate(
      {_id : id},
      {name ,slug : slugify(name)},
      {new : true}
      )
      if(!category){
        res.status(400).json({msg :`did not find ${id}`}) 
      }
      else{
            res.status(200).json({ data: category});
          }
    }
)

// desc : delte category
// route : DELETE / api / v1 /categories
// accesss : private 
// params  : catID

exports.deleteCtegory = asyncHandler(
  async (req,res)=>{
    const {id}  = req.params
    const category = await CategoryModel.findByIdAndDelete(id)
    if(!category){
      res.status(400).json({msg :`did not find ${id}`}) 
    }
    else{
          res.status(200).json();
        }
  }
)