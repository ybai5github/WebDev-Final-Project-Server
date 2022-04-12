import usersModel from "./users-model.js";

const register = (user) => usersModel.create(user);

export default {
    register
}