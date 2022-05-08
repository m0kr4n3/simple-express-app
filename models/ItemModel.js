const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    itemName: {
        type: String,
        required: [true, 'Please add a name'],
        unique: true,
        maxlength: [250, 'Name cannot be more than 250 characters']
    },
    categoryName: {
        type: String,
        required: [true, 'Please add a category'],
    },
    price: {
        type: Number,
        required: [true, 'Please add a price']
    },
    date: {
        type: Date,
        default: Date.now()
    },
    photo: {
        type: String,
        default: 'no-photo.jpg'
    }
});
module.exports = mongoose.model('Item', ItemSchema);