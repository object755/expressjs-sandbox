import mongoose from "mongoose";
import { dbRandomUsersCollection } from "./data/serverData.js";

// const Post = new mongoose.Schema({
//   name: { type: String, required: true, unique: true },
//   country: { type: String },
//   city: { type: String },
//   social: { type: String },
//   avatar: { type: String }
// });

const Post = new mongoose.Schema({
  gender: String,
  fullName: String,
  name: {
    title: String,
    first: String,
    last: String,
  },
  location: {
    street: {
      number: Number,
      name: String,
    },
    city: String,
    state: String,
    country: String,
    postcode: String,
    coordinates: {
      latitude: String,
      longitude: String,
    },
    timezone: {
      offset: String,
      description: String,
    },
  },
  email: String,
  login: {
    uuid: String,
    username: String,
    password: String,
    salt: String,
    md5: String,
    sha1: String,
    sha256: String,
  },
  userId: {
    name: String,
    value: String,
  },
  dob: {
    date: Date,
    age: Number,
  },
  registered: {
    date: Date,
    age: Number,
  },
  phone: String,
  cell: String,
  picture: {
    large: String,
    medium: String,
    thumbnail: String,
  },
});

//third variable responsible for the name of the collection
export default mongoose.model("Post", Post, dbRandomUsersCollection);
