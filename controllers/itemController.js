const Item = require("../models/item")
const Category = require("../models/category")
const asyncHandler = require('express-async-handler')



// Display list of items
exports.item_list = asyncHandler(async (req, res, next) => {
    const allItems = await Item.find({}, "name price number_in_stock")
        .sort({name:1})
        .exec()
    res.render("home", {item_list: allItems})
  });

// Display detail page for a specific item
exports.item_detail = asyncHandler(async (req, res, next) => {
    const item = await Item.find({_id: req.params.id}, "name price number_in_stock").exec()
    res.render("item_details", {item_detail: item, id: req.params.id})
})

// Display Item create form on GET
exports.item_create_get = asyncHandler(async (req, res, next) => {
    const allCategories = await Category.find({}, "name").exec()
    res.render("item_create", {category_list: allCategories})
})

// Handle Item create on POST
exports.item_create_post = asyncHandler(async (req, res, next) => {
    const item = new Item({
        name: req.body.name,
        category: req.body.category,
        price: req.body.price,
        number_in_stock: req.body.stock
    })
    await item.save()
    res.redirect("/")
})

// Handle Item delete form on GET
exports.item_delete_get = asyncHandler(async (req, res, next) => {
    const item = await Item.findOne({_id: req.params.id}).exec()
    res.render("item_delete", {item:item})
})

// Handle Item delete on POST
exports.item_delete_post = asyncHandler(async (req, res, next) => {
    await Item.deleteOne({_id: req.params.id})
    res.redirect("/inventory")
})

// Handle Item update form on GET
exports.item_update_get = asyncHandler(async (req, res, next) => {
    const item = await Item.findOne({_id: req.params.id}, "name price number_in_stock").exec()
    const allCategories = await Category.find({}, "name").exec()
    res.render("item_update", {item: item, categories: allCategories})
})

// Handle Item update on POST
exports.item_update_post = asyncHandler(async (req, res, next) => {
    await Item.updateOne({_id: req.params.id}, {$set: {
        name: req.body.name,
        category: req.body.category,
        price: req.body.price,
        number_in_stock: req.body.stock
    }}) 
    res.redirect(`/inventory/item/${req.params.id}`)
})


