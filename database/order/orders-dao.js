import ordersModel from "./orders-model.js";

const order = (user) => ordersModel.updateOne({ email: user.email }, { $push: { cartItems: merged }} );

export default {
    order
}