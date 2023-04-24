const Category = require("../models/category")
const Item = require("../models/item")
const asyncHandler = require('express-async-handler')

// Display list of categories
exports.category_list = asyncHandler(async (req, res, next) => {
    const allCategories = await Category.find({}, "name").exec()
    res.render("category_list", {category_list: allCategories})
})

// Display detail page for a specific category
exports.category_detail = asyncHandler(async (req, res, next) => {
    const itemList = await Item.find({category: req.params.id}).exec()
    const category = await Category.findOne({_id: req.params.id}, "name").exec()
    res.render("category_detail", {item_list:itemList, category_name: category.name, category_id: category.id})
})

// Display category create form on GET
exports.category_create_get = asyncHandler(async (req, res, next) => {
    res.render("category_create")
})

// Handle category create on POST
exports.category_create_post = asyncHandler(async (req, res, next) => {
    const category = new Category({
        name: req.body.category
    })
    await category.save()
    res.redirect("/inventory/categories")
})

// Handle category delete form on GET
exports.category_delete_get = asyncHandler(async (req, res, next) => {
    const itemList = await Item.find({category: req.params.id}).exec()
    const category = await Category.findOne({_id: req.params.id}).exec()
    res.render("category_delete", {item_list: itemList, category_name: category.name})
})

// Handle category delete on POST
exports.category_delete_post = asyncHandler(async (req, res, next) => {
    await Category.deleteOne({_id: req.params.id})
    res.redirect("/inventory/categories")

})

// Handle category update form on GET
exports.category_update_get = asyncHandler(async (req, res, next) => {
    const category = await Category.findOne({_id: req.params.id})
    res.render("category_update", {category:category.name})
})

// Handle category update on POST
exports.category_update_post = asyncHandler(async (req, res, next) => {
    await Category.updateOne({_id: req.params.id}, {$set: {
        name: req.body.category
    }})
    res.redirect(`/inventory/category/${req.params.id}`)
})