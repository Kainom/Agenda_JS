const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PictureScheme = new Schema({
    name:{type:String,require:true},
    src:{type:String,require:true},
    _id:{type:mongoose.Schema.ObjectId,require:true}
 }
);

module.exports = mongoose.model("Picture",PictureScheme);