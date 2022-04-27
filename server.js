import express from 'express';
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt-nodejs';
import cors from 'cors';
import mongoose from "mongoose";
import reviewsController from "./controllers/reviews-controller.js";
import handleSignIn from './controllers/signin.js';
import handleRegister from './controllers/register.js';
import handleAdmin from './controllers/admin.js';

/* mongoose.connect('mongodb+srv://felixyn:drinks@cluster0.mwd5s.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'); */


const CONNECTION_STRING = process.env.DB_CONNECTION_STRING
    || 'mongodb://localhost:27017/webdevfinal'
mongoose.connect(CONNECTION_STRING);

var db = mongoose.connection;

const app = express();
app.use(bodyParser.json());
app.use(cors());

reviewsController(app);

app.post('/signin', (req, res) => { handleSignIn(req, res, db, bcrypt) });

app.get('/', (req, res) => { res.send('it is working') })

app.post('/register', (req, res) => { handleRegister(req, res, db, bcrypt) });

app.get('/admin', async (req, res) => { handleAdmin(req, res, db) });

var globalEmail = "";

console.log('global email', globalEmail);

app.post('/order', async (req, res) => {

    const newOrder = req.body;
    /* console.log('new order', newOrder); */

    var query = { cartItems: newOrder.cartItems }

    const entries = Object.entries(newOrder.cartItems);
    var merged = [].concat.apply([], entries);
    console.log('merged array', merged);

    console.log("email", newOrder.email);
    globalEmail = newOrder.email;

   /*  console.log('enties', entries); */
    if (db.collection('users').find(query)) {

        db.collection('users').updateOne({ "email": newOrder.email }, { $push: { "cartItems": merged } })
        console.log('found');

    } else {
        db.collection('users').updateOne({ "email": newOrder.email }, { $set: { "cartItems": merged } })
        console.log('not found');
    }
    res.json(newOrder.cartItems);
})

// select cart items by email returns hisotry of items ordered by user
app.get('/cartitems', async (req, res) => {
    console.log('global email', globalEmail);

    if (globalEmail == "") {
        res.status(400).json('please purchase the items before viewing the history');
        console.log("error viewing the history");
    } else {
        var query = { email: globalEmail }
        db.collection('users').find(query).toArray(function (err, result) {
            if (err) throw err;
            console.log('result', result);
            if (result === undefined || result.length == 0) {
                res.status(400).json('please purchase the items before viewing the history');
                console.log("error viewing the history");
            } else {
                /* console.log('result [0]. cartItems', result[0].name); */
                var merged = [].concat.apply([], result[0].cartItems);
                console.log('merged array', merged);
                /* console.log('result [0]. cartItems', result[0].cartItems[0]); */

                res.json(merged);
            }
        })
    }
    globalEmail = "";
})

app.listen(process.env.PORT || 4000, () => {
    console.log(`app is rnning on port ${process.env.PORT}`)
})
