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

const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        port: 5432,
        user: 'felixyamano',
        password: '',
        database: 'smart-brain'
    }
});


db.select('*').from('users').then(data => {
    console.log(data);
});

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

app.post('/signin', (req, res) => { handleSignIn(req, res, db, bcrypt) });

app.get('/profile/:id', (req, res) => { handleProfile(req, res, db) });


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
    console.log('new user', newUser);
    const insertedUser = await usersDao.register(newUser);
    console.log(insertedUser);
    res.json(insertedUser);
})

app.listen(4000, () => {
    console.log('app is running on ')
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