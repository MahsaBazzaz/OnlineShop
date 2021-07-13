const product = require("../services/products");
const category = require("../services/categories");

// create category
async function testCreateCategory() {
    await category.createCategory({ "name": "books" });
}

// create product
async function testCreateProduct() {
    let createdCategory = await category.createCategory({ "name": "bags" });
    console.log(createdCategory);
    product.createProduct({
        "name": "keyboard",
        "category": createdCategory.dataValues.id,
        "price": 1000,
        "remaining": 20,
        "sold": 0
    });
}

// edit category
async function testEditCategory() {
    let createdCategory = await category.createCategory({ "name": "health" });
    category.editCategory({ "name": "cosmetic" }, createdCategory.dataValues.id);
}

// edit product
async function testEditProduct() {
    let createdCategory = await category.createCategory({ "name": "clothes" });
    let createdProduct = await product.createProduct({
        "name": "scarf",
        "category": createdCategory.dataValues.id,
        "price": 1000,
        "remaining": 20,
        "sold": 0,
    });
    product.editProduct({ "price": 2000 }, createdProduct.dataValues.id);
}

// find product with name
function testFindProductWithName() {
    let createdCategory = await category.createCategory({ "name": "clothes" });

    let createdProduct = await product.createProduct({
        "name": "scarf",
        "category": createdCategory.dataValues.id,
        "price": 1000,
        "remaining": 20,
        "sold": 0,
    });
    product.findProductWithName(createdProduct.dataValues.name);
}

module.exports = { testCreateCategory, testCreateProduct, testEditCategory, testEditProduct, testFindProductWithName };