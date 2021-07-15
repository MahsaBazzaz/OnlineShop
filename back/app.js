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
const adminService = require("../back/services/adminService");

// test database connection
db.authenticate().then(() => console.log("Khoda bozorge")).catch(err => console.log("Ghalat kardam " + err.message));

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => res.send("INDEX"));

// get allcategories
app.get('/user/getAllCategories', async(req, res) => {
    console.log(req.query);
    const allCategories = await userService.getAllCategories();
    res.send(allCategories);
});


app.use('/admin', (req, res, next) => {
    const auth = {login: 'admin', password: 'password'};
    const b64auth = (req.headers.authorization || '').split(' ')[1] || '';
    const [login, password] = Buffer.from(b64auth, 'base64').toString().split(':');

    // Verify login and password are set and correct
    if (login && password && login === auth.login && password === auth.password) {
        // Access granted...
        return next();
    }

    // Access denied...
    res.set('WWW-Authenticate', 'Basic realm="401"'); // change this
    res.status(401).send('Authentication required.'); // custom message
});

app.post('/user/getProducts', async(req, res) => {
    body = req.body;
    console.log(body);
    const response = await userService.getProducts(body);
    res.send(response);

});

app.get('/admin/getAllReceipts', async(req, res) => {
    const receipts = await adminService.getAllReceiptsForAdmin();
    console.log(receipts);
    res.send(receipts);
})


//app.use("/admin", require("./services/db/admin"));

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});