const express = require("express");
const cors = require('cors')
    //const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const path = require("path");
const port = 3000;
// DB
const db = require("../back/config/database");
// DB Test
const dbTest = require("../back/tests/databaseServices");

//services Test
const userService = require("../back/services/userService");
const AdminService = require("../back/tests/adminService");
// test database connection
db.authenticate().then(() => console.log("Khoda bozorge")).catch(err => console.log("Ghalat kardam " + err.message));

const app = express();

app.use(cors());
app.get('/', (req, res) => res.send("INDEX"));
// get all products
app.get('/getAllProducts', async(req, res) => {
    console.log(req.query);
    const allProducts = await userService.getAllProducts(req.query.page, req.query.productsInPage);
    res.send(allProducts);
});
// get sorted products by price
app.get('/getSortedProductsByPrice', async(req, res) => {
    console.log(req.query);
    const allProducts = await userService.getProductsSortedByPrice(req.query.order, req.query.page, req.query.productsInPage);
    res.send(allProducts);
});
// get sorted products by sells
app.get('/getSortedProductsBySells', async(req, res) => {
    console.log(req.query);
    const allProducts = await userService.getProductsSortedBySold(req.query.order, req.query.page, req.query.productsInPage);
    res.send(allProducts);
});
// get allcategories
app.get('/getAllCategories', async(req, res) => {
    console.log(req.query);
    const allCategories = await userService.getAllCategories();
    res.send(allCategories);
});
//app.use("/admin", require("./services/db/admin"));

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});