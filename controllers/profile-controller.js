import * as profileDAO from '../database/users/users-dao.js';

// const updateUser = async (req, res) => {
//
//   const person = await profileDAO.updateUser(req.params.id, req.body)
//
//   res.json(person);
// }


const updatePerson = async (req, res) => {
  const userdIdToUpdate = req.params.id;
  const updatedUser = req.body;
  const status = await profileDAO.updateUser(userdIdToUpdate,updatedUser);
  res.send(status);
  res.sendStatus(200);
  res.json(status);
}


const profileController = (app) => {
  // app.put("/editProfile/:id", updateUser);
  app.put("/editProfile/:id", updatePerson);
}

export default profileController;
