import ProfileModel from "./ProfileModel";

export const findAllUsers = () => ProfileModel.find();

export const findUserById = (uid) => ProfileModel.find({_id: uid});

export const createUsers = (profile) => ProfileModel.create(profile);

export const deleteUser = (uid) => ProfileModel.deleteOne({_id: uid});

export const updateUser = (uid, profile) => ProfileModel.updateOne({_id: uid}, {$set: profile})