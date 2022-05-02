const express = require('express');
const bodyParser = require('body-parser');
const ejs=require('ejs')
const app = express();
const port = 3000
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.set('view engine', 'ejs')
app.use(express.static('public'))

const UserRoute = require('./routes/UserRoute')
app.use('/user',UserRoute)

const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');
const {destroy, findAll, findOne, create} = require("./controllers/UserController");
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Database Connected Successfully!!");
}).catch(err => {
    console.log('Could not connect to the database', err);
    process.exit();
});


app.get('/', (req, res) => {
    res.render('index');
});

app.post('/', (req, res) => {
    create(req,res)
});

app.get('/read', (req, res) => {
    findAll(req, res)
});

app.get('/find', (req, res) => {
    res.render('find');
});
app.get('/findbyemail', (req, res) => {
    findOne(req,res)
});

app.get('/delete', (req, res) => {
    res.render('delete');
});
app.get('/deletebyemail', (req, res) => {
    destroy(req,res)
});

app.listen(port, () => {
    console.log(`Server is listening on port http://localhost:${port}`);
});