import mongoose from 'mongoose';

import ProfileSchema from "./ProfileSchema.js";


const ProfileModel = mongoose.model('TuitsModel', ProfileSchema);

export default ProfileModel