import mongoose from "mongoose";
import loginSchema from './login-schema.js';

const loginModel = mongoose.model('UsersModel', loginSchema);

export default loginModel;

