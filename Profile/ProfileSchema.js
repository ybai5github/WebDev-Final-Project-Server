import mongoose from 'mongoose';

const schema = mongoose.Schema({
  bio: String,
  username: {type:String, default: "alice"},
  dob: {type: String, default: "01/01/2002" },
  profilePicture: {type:String, default: "https://images.saymedia-content.com/.image/t_share/MTc5NjQ1ODEzMTgwNDA5ODE2/the-tragedy-of-eren-yeager-how-the-character-changes-throughout-attack-on-titan.png"},
  location: String,
  email: String,
  postedBy: {
    username: String
  }}, {collection: 'users'});

export default schema