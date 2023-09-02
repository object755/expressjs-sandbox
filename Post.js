import mongoose from "mongoose";

const Post = new mongoose.Schema({
    pilot: {type: String, required: true},
    vehicle: {type: String, required: true},
    country: {type: String, required: true},
    avatar: {type: String}
})

//third variable responsible for the name of the collection
export default mongoose.model('Post', Post, 'pilot_names');

// nu proverim kak legko sync proishodit for laptop