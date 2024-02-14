const express = require('express');

const { getCategories,createCategory ,getSpecificCategory , updateCategory , deleteCtegory} = require('../services/categoryService');

const router = express.Router();

router.route('/').get(getCategories).post(createCategory);
router.get('/:categoryName' , getSpecificCategory)
router.route('/:id').put(updateCategory).delete(deleteCtegory)

module.exports = router;
