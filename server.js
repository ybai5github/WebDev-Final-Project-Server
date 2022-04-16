import express from 'express';
import cors from 'cors';
import UserController from "./Controllers/UserController.js";
import mongoose from "mongoose";

// const CONNECTION_STRING = process.env.DB_CONNECTION_STRING || 'mongodb://localhost:27017/webdev'
mongoose.connect('mongodb+srv://felixyn:drinks@cluster0.mwd5s.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');

{/* Adding mongo to Heroku*/}

const app = express();
app.use(cors());
app.use(express.json());
UserController(app);
app.get('/', (req, res) => {
  res.send('Welcome Tomodachi!')

})
app.listen(process.env.PORT ||6000);