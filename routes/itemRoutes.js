const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');

// Routes
router.route('/')
    .get(itemController.getAllItems)
    .post(itemController.createItem);


    router.route('/:id')
    .get(itemController.getItem)
    .put(itemController.updateItem)
    .delete(itemController.deleteItem);

module.exports = router;