import express from 'express';
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt-nodejs';
import cors from 'cors';
import knex from 'knex';
import handleRegister from './controllers/register.js'
import handleSignIn from './controllers/signin.js';
import handleProfile from './controllers/profile.js';
import mongoose from "mongoose";
import usersDao from './users-dao.js';


mongoose.connect('mongodb://0.0.0.0:27017/webdevfinal');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

var db = mongoose.connection;

/* console.log(db); */

/* db.select('*').from('users').then(data => {
    console.log(data);
});
 */

const app = express();
app.use(bodyParser.json());
app.use(cors());

/* app.get('/hello', (req, res) => { res.send('Hello World!') })
app.get('/', (req, res) => { res.send('Welcome to Full Stack Development!') })  */

const database = {
    users: [
        {
            id: '134',
            name: 'sarah',
            email: 'cookies',
            password: 'tomato',
            address: '123 street',
            entry: 0,
            joined: new Date()
        },
        {
            id: '13131334',
            name: 'sally',
            email: 'oreo',
            password: 'cookies',
            address: '145 street',
            entry: 0,
            joined: new Date()
        }
    ]
}

app.get('/', (req, res) => {
    res.send(database.users);
})

/* app.post('/signin', (req, res) => { handleSignIn(req, res, db, bcrypt) }); */

app.get('/profile/:id', (req, res) => { handleProfile(req, res, db) });

app.post('/signin', async (req, res) => {
    const login = req.body;
    console.log(login);
    if (!login.email || !login.password) {
        return res.status(400).json('incorrect form submission');
    }

    var query = { email: login.email }
    db.collection('login').find(query).toArray(function (err, result) {
        if (err) throw err;
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
    });

})

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


/* const { email, name, password, address} = req.body;
if (!email || !name || !password){
    return res.status(400).json('incorrect form submission)');
}
const hash = bcrypt.hashSync(password);
 
db.transaction(trx => {
    trx.insert({
        hash: hash,
        email: email,
    })
        .into('login')
        .returning('email')
        .then(loginEmail => {
            return trx('users')
                .returning('*')
                .insert({
                    email: loginEmail[0].email,
                    name: name,
                    address: address,
                    joined: new Date()
                })
                .then(user => {
                    res.json(user);
                })
        })
        .then(trx.commit)
        .catch(trx.rollback)
})
    .catch(err => res.status(400).json('unable to register')) */

app.listen(4000, () => {
    console.log('app is running on 4000')
})

/*
/signin -> post = success/fail
/register -> post = user
/profile/:userId -> GET = user
/image -> PUT -> user

*/

/* bcrypt.hash(password, null, null, function (err, hash) {
       console.log(hash);
       // Store hash in your password DB.
   }); */
/* database.users.push({
    id: id,
    name: name,
    email: email,
    password: password,
    entires: 0,
    joined: new Date()
}) */