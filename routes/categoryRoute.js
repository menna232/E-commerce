const express = require('express');
const { param, validationResult } = require('express-validator');
const { getCategories,createCategory ,getSpecificCategory , updateCategory , deleteCtegory} = require('../services/categoryService');
const router = express.Router();

router.route('/').get(getCategories).post(createCategory);
router.get('/:categoryName' , getSpecificCategory)
router.route('/:id').put(param('id').isMongoId().withMessage("invalid category id "),updateCategory).delete(deleteCtegory)

module.exports = router;

