const Category = require('./db/categories');
const Product = require('./db/products');
const Receipt = require('./db/receipts');


async function editProduct(productId, newFields) {
    await Product.editProduct(newFields, productId);
}

async function getAllReceipts() {
    await Receipt.getAllReceipts();
}

async function searchReceiptByTackingCode(trackingCode) {
    await Receipt.findReceiptByTrackingCode(trackingCode);
}

async function changeReceiptStatus(receiptId, newStatus) {
    await Receipt.editReceipt({ "status": newStatus }, receiptId);
}

async function createCategory(newCategory) {
    await Category.createCategory(newCategory);
}

async function editCategory(categoryId, newFields) {
    await Category.editCategory(newFields, categoryId);
}

async function deleteCategory(categoryId) {
    await Category.deleteCategory(categoryId);
}