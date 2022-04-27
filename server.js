import express from 'express';
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt-nodejs';
import cors from 'cors';
import handleRegister from './controllers/register.js'
import handleSignIn from './controllers/signin.js';
import handleProfile from './controllers/profile.js';
import mongoose from "mongoose";
import usersDao from './database/users/users-dao.js';
import reviewsController from "./controllers/reviews-controller.js";
import res from 'express/lib/response';


/* mongoose.connect('mongodb+srv://felixyn:drinks@cluster0.mwd5s.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'); */


const CONNECTION_STRING = process.env.DB_CONNECTION_STRING
    || 'mongodb://localhost:27017/webdevfinal'
mongoose.connect(CONNECTION_STRING);


// process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

var db = mongoose.connection;

var id = mongoose.Types.ObjectId();

/* console.log(db); */

/* db.select('*').from('users').then(data => {
    console.log(data);
});
 */

const app = express();
app.use(bodyParser.json());
app.use(cors());

reviewsController(app);

/* app.post('/signin', (req, res) => { handleSignIn(req, res, db, bcrypt) }); */

app.get('/', (req,res) => {res.send('it is working')})

app.get('/profile/:_id', (req, res) => { handleProfile(req, res, db) });

app.post('/signin', async (req, res) => {
    const login = req.body;
    console.log(login);
    if (!login.email || !login.password) {
        return res.status(400).json('incorrect form submission');
    }

    var query = { email: login.email }
    db.collection('login').find(query).toArray(function (err, result) {
        if (err) throw error;
        if (result.length == 0) {
            res.status(400).json('wrong credentials');
        } else {
            console.log(result);
            console.log(result[0].hash);
            const isValid = bcrypt.compareSync(req.body.password, result[0].hash);
            console.log(isValid);
            if (isValid) {
                var query = { email: login.email }
                db.collection('users').find(query).toArray(function (err, result) {
                    if (err) throw err;
                    console.log('result', result);
                    console.log('result [0]', result[0]);
                    res.json(result[0])
                })
            } else {
                res.status(400).json('wrong credentials')
            }
        }
    })

})


var globalEmail = "";

app.post('/order', async (req, res) => {
    /*  console.log(req.params._id) */
    const newOrder = req.body;
    console.log('new order', newOrder);
    /*  mongoose.Types.ObjectId("625776702f0ac5806ef38643")  */
    /* var doc = { cartItems: newOrder.cartItems };
    console.log('doc', doc); */
    var query = { cartItems: newOrder.cartItems }

    const entries = Object.entries(newOrder.cartItems);
    var merged = [].concat.apply([], entries);
    console.log('merged array', merged);

    console.log("email", newOrder.email);
    globalEmail = newOrder.email;

    console.log('enties', entries);
    if (db.collection('users').find(query)) {

        db.collection('users').updateOne({ "email": newOrder.email }, { $push: { "cartItems": merged } })
        console.log('found');

    } else {
        db.collection('users').updateOne({ "email": newOrder.email }, { $set: { "cartItems": merged } })
        console.log('not found');
    }

    /*  db.collection('users').updateOne({ "email": "admin@gmail.com"}, { $set: { "cartItems": doc } }, function (error, response) {
         if (error) {
             console.log('Error occurred while inserting', error);
             return;
         } else {
             console.log('inserted record', response);
         }
 
     })
  */
    res.json(newOrder.cartItems);
    /* console.log('new order cartItems', newOrder.cartItems); */
})

console.log('globala email', globalEmail);

// select cart items by email returns hisotry of items ordered by user
app.get('/cartitems', async (req, res) => {
    console.log('global email', globalEmail);
    /*   const cartEmail = globalEmail;
      console.log('cart email', cartEmail); */

    /*  usersModel.find({email: cartEmail}, {"cartItems": 1}), function(err, usersModels){
         if (err) return console.error(err);
         console.log("usersmodel", usersModels);
         var merged = [].concat.apply([], usersModels[1].cartItems);
         console.log('merged array', merged);
         console.log(usersModels[0].cartItems);
         res.json(merged);
     } ; */
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

app.get('/admin', async (req, res) => {
    db.collection('users').find({}, { cartItems: 1 }).toArray(function (err, result) {
        if (err) throw err;
        console.log('result', result.length);

        const combined = [];
        for (var i = 0; i < result.length; i++) {
            var merged = [].concat.apply([], result[i].cartItems);
          
            combined.push(merged);
            console.log('merged array', merged.length);
            console.log('combined', combined)
        }
        console.log([].concat.apply([],combined));
        res.json([].concat.apply([],combined));
    })

})

app.post('/register', async (req, res) => {
    const newUser = req.body;
    console.log('new user email', newUser.email);
    if (!newUser.email || !newUser.name || !newUser.address || !newUser.password) {
        return res.status(400).json('incorrect form submission - message from the server');
    }
    const hash = bcrypt.hashSync(newUser.password);
    var doc = { hash: hash, email: newUser.email };
    db.collection('login').insertOne(doc, function (error, response) {
        if (error) {
            console.log('Error occurred while inserting');
            return;
        } else {
            console.log('inserted record');
        }
    });

    console.log('new user email', newUser.email);
    console.log('new user', newUser);
    const insertedUser = await usersDao.register(newUser).catch(err => {
        console.log('error', err);

        res.status(400).json('user or login duplicates not allowed');
    });
    console.log(insertedUser);
    res.json(insertedUser);

})

app.listen(process.env.PORT || 4000);

/* var date = new Date();
var components = [
    date.getYear(),
    date.getMonth(),
    date.getDate(),
    date.getHours(),
    date.getMinutes(),
    date.getSeconds(),
    date.getMilliseconds()
];
 */
/* var id = components.join(""); */

/* app.post('/register', (req, res) => { handleRegister(req, res, db, bcrypt) }) */
/* app.post('/imageurl', (req,res) => { handleApi(req,res)})
 */

/* app.post('/register', (req, res) => {
    const { email, name, password, address, dob } = req.body;
    database.users.push(
        {
            id: '100',
            name: name,
            email: email,
            password: password,
            address: address,
            dob: dob,
            joined: new Date()
        })
    res.json(database.users[database.users.length - 1]);
}) */
// Load hash from your password DB.
/* bcrypt.compare("bacon", hash, function (err, res) {
    // res == true
});
bcrypt.compare("veggies", hash, function (err, res) {
    // res = false
});
 */