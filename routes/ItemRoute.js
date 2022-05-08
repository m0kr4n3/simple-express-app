const express = require('express');
const {
    GetItem,
    CreateItem,
    UpdateItem,
    DeleteItem
} = require('../controllers/ItemController');
const router = express.Router();

router
    .route('/:id?')
    .get(GetItem)
    .post(CreateItem)
    .put(UpdateItem)
    .delete(DeleteItem);

module.exports = router;