#! /usr/bin/env node

console.log(
    'This script populates some test categories and items to your database. Specified database as argument - e.g.: node populatedb "mongodb+srv://deeshonhunukumbura18:nyctophile101@cluster0.lz91hw2.mongodb.net/inventory_application?retryWrites=true&w=majority"'
  );
  
  // Get arguments passed on command line
  const userArgs = process.argv.slice(2);
  
  const Item = require("./models/item");
  const Category = require("./models/category");
  
  const items = [];
  const categories = [];
  
  const mongoose = require("mongoose");
  mongoose.set("strictQuery", false); // Prepare for Mongoose 7
  
  const mongoDB = userArgs[0];
  
  main().catch((err) => console.log(err));
  
  async function main() {
    console.log("Debug: About to connect");
    await mongoose.connect(mongoDB);
    console.log("Debug: Should be connected?");
    await createCategories();
    await createItems();
    console.log("Debug: Closing mongoose");
    mongoose.connection.close();
  }


  async function categoryCreate(name) {
    const category = new Category({name: name});
    await category.save();
    categories.push(category);
    console.log(`Added category: ${name}`);
  }
  
  async function itemCreate(name, category, price, number_in_stock) {
    itemdetail = {
        name: name,
        category: category,
        price: price,
        number_in_stock: number_in_stock
    }
    const item = new Item(itemdetail);
    await item.save();
    items.push(item);
    console.log(`Added item: ${name}`);
  }
    
  async function createCategories() {
    console.log("Adding categories");
    await Promise.all([
      categoryCreate("Asus"),
      categoryCreate("HP"),
      categoryCreate("Dell"),
      categoryCreate("Samsung"),
      categoryCreate("Razer"),
      categoryCreate("MSI"),
      categoryCreate("Acer"),
      categoryCreate("Lenovo"),
      categoryCreate("Alienare"),
      categoryCreate("Mac"),
      categoryCreate("Microsoft Surface"),
    ]);
  }
  
 
  async function createItems() {
    console.log("Adding items");
    await Promise.all([
      itemCreate(
        "Asus ExpertBook L1500CDA - BQ0655 (R3)",
        categories[0],
        "Rs177,000",
        10
      ),
      itemCreate(
        "Asus TUF Gaming F15 FX507ZC – HN025W (i7)",
        categories[0],
        "Rs577,000",
        5
      ),
      itemCreate(
        "ASUS ROG Scar 15 G533QS (R9)",
        categories[0],
        "Rs1,350,000",
        7
      ),
      itemCreate(
        "HP ProBook 450 G8 (i5/Win 10 Home)",
        categories[1],
        "Rs350,000",
        9
      ),
      itemCreate(
        "HP Pavilion 15 - Eg0568Tu",
        categories[1],
        "Rs324,000",
        3
      ),
      itemCreate(
        "Razer Blade 14",
        categories[4],
        "Rs720,000",
        12
      ),
      itemCreate(
        "Razer Blade 18",
        categories[4],
        "Rs1,250,000",
        3
      ),
    ]);
  }
