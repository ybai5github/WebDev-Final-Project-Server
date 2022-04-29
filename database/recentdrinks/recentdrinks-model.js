import mongoose from "mongoose";
import drinkSchema from './recentdrinks-schema';

const drinkModel = mongoose.model('DrinkModel', drinkSchema);

export default drinkModel;