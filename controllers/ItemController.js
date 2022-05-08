const ItemModel = require('../models/ItemModel');
const ErrorResponsive = require('../utils/errorResponsive');
const asyncHandler = require('../middleware/async');

// @desc    Get Items
// @route   GET /api/items/
// @access  Public
exports.GetItem = asyncHandler(async(req, res, next) => {
    if (req.params.id === undefined) {
        const Items = await ItemModel.find();
        res.status(200).json({
            success: true,
            count: Items.length,
            data: Items
        });
    } else {
        const Item = await ItemModel.findById(req.params.id);
        if (!Item) {
            return next(
                new ErrorResponsive(`Item not found with id of ${req.params.id}`, 404)
            );
        };
        res.status(200).json({
            success: true,
            data: Item
        });
    }
});

// @desc    Create Items
// @route   POST /api/items/
// @access  Private
exports.CreateItem = asyncHandler(async(req, res, next) => {

    if (req.params.id === undefined) {
        const ItemData = await ItemModel.create(req.body);
        res.status(200).json({
            success: true,
            data: ItemData
        });
    } else {
        return next(
            new ErrorResponsive('Not the right method', 400)
        );
    }
});

// @desc    Update Items
// @route   PUT /api/items/
// @access  Private
exports.UpdateItem = asyncHandler(async(req, res, next) => {
    if (req.params.id === undefined) {
        return next(
            new ErrorResponsive('You have to select the item', 400)
        );
    } else {
        const Item = await ItemModel.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!Item) {
            return next(
                new ErrorResponsive(`Item not found with id of ${req.parmas.id}`, 404)
            );
        }
        res.status(200).json({ status: true, data: Item });
    }
});

// @desc    Delete Items
// @route   Delete /api/items/
// @access  Private
exports.DeleteItem = asyncHandler(async(req, res, next) => {
    if (req.params.id === undefined) {
        return next(
            new ErrorResponsive('you have to select the item', 400)
        )
    } else {
        const Item = await ItemModel.findByIdAndDelete(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!Item) {
            return next(
                new ErrorResponsive(`Item not found with id ${req.params.id}`, 404)
            );
        };
        res.status(200).json({ status: true, data: Item });
    }
});