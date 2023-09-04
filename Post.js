import mongoose from "mongoose";
import {dbCollectionName} from './serverData.js';

const Post = new mongoose.Schema({
    pilotName: {type: String, required: true, unique: true},
    country: {type: String, required: true},
    city: {type: String},
    social: {type: String},
    avatar: {type: String}
})

//third variable responsible for the name of the collection
export default mongoose.model('Post', Post, dbCollectionName);
