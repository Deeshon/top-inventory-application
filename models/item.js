const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    name: {type: String, required: true, maxlength: 100},
    category: {type: Schema.Types.ObjectId, ref: "Category", required: true},
    price: {type: String, required: true},
    number_in_stock: {type: Number, required: true}
})

// Virtual for item URL
ItemSchema.virtual("url").get(function () {
    return `/inventory/item/${this._id}`
})

// Export model
module.exports = mongoose.model("Item", ItemSchema)


