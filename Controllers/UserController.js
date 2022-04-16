import people from './users.js';
import * as ProfileDAO from "../Profile/ProfileDAO.js"
let users = people;

const UserController = (app) =>{
  app.get('/api/users', findAllUsers);
  app.get('/api/users/:uid', findAllUsers2);
  app.get('/api/users/:uid', findUserById);
  app.post('/api/users', createUsers);
  app.delete('/api/users/:uid',deleteUser);
  app.put('/api/users/:uid', updateUser);
}

const findAllUsers = async (req, res) => {
  const type = req.query.type;
  const use = await ProfileDAO.findAllUsers();
  if(type){
    res.json(findUsersByType(type));
  }
  res.json(use);
}

const findAllUsers2 = async (req, res) => {
  const name = req.query.uid;
  const type = await ProfileDAO.findUserById(name);
  res.send(type);
  res.sendStatus(200);
}

const findUsersByType = (type) =>{
  return users.filter(c => c.type === type);
}

const findUserById = (req, res) =>{
  const userId = req.params.uid;
  const user = users.find(u=> u._id === userId);
  res.json(user);
}

const createUsers = async (req, res) =>{
  const newUser = req.body;
  const insertedUser = await ProfileDAO.createUsers(newUser);
  res.json(insertedUser);
}

const deleteUser = async (req, res) =>{
  const userId = req.params.uid;
  const status = await ProfileDAO.deleteUser(userId);
  res.send(status);
  res.sendStatus(200);
}

const updateUser = async (req,res) =>{
  const userId = req.params.uid;
  const updatedUser = req.body;
  const userrs = await ProfileDAO.updateUser(userId,updatedUser);
  res.send(userrs);
  res.sendStatus(200);
}

export default UserController;