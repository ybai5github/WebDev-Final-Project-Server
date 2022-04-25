import mongoose from "mongoose";
import ordersSchema from './orders-schema.js';

const ordersModel = mongoose.model('UsersModel', ordersSchema);

export default ordersModel;