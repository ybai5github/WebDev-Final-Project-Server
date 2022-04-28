import * as profileDAO from '../database/users/users-dao.js';

const updatePerson = async (req, res) => {
  const userdIdToUpdate = req.params.id;
  const updatedUser = req.body;
  const status = await profileDAO.updateUser(userdIdToUpdate, updatedUser);
   console.log('status working',status);
  res.json(status);
}

const profileController = (app) => {
  // app.put("/editProfile/:id", updateUser);
  app.put("/editProfile/:id", updatePerson);
}

export default profileController;

