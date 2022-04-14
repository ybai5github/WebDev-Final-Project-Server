import loginModel from "./login-model.js";

const login = (user) => loginModel.create(user);

export default {
    login
}