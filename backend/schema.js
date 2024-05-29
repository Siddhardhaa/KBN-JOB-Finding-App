const mongoose = require ("mongoose")

const contentSchema=new mongoose.Schema({
    title:{type:String},
    work:{type:String},
    name:{type:String},
    url:{type:String},
    location:{type:String},
    link:{type:String},
    des:{type:String},
    skills:{type:[]},
    userId:{type:String}
}, {
    timestamps: true,})

const Content = mongoose.model("jobs",contentSchema)

module.exports = { Content }
