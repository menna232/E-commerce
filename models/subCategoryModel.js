const mongoose = require('mongoose')

const subCategorySchema = new mongoose.Schema({
    name : {
        type :String,
        trim :true,
        unique :[true, " subCategory name must be unique"],
        minlength :[2, "too short name"],
        maxlength :[32 , "too long name "],
    },
    slug :{
        type : String ,
        lowercase : true,
    },
    category :{
        type:mongoose.Schema.ObjectId,
        ref:'category',
        required : [true , "subCategory must belong to parent category"]
    }
} , 
{timestamps:true}
);

const subCategoryModel =mongoose.model('SubCategory' , subCategorySchema)

module.exports= subCategoryModel
