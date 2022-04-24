import usersModel from "./users-model.js";


const register = (user) => usersModel.create(user);

export const findUser = async () => {
    const updateuser = await usersModel.find();
    return updateuser;
}

export default {
    register,
    findUser
}