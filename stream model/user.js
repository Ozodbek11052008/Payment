const mongoose = require('mongoose')
const streamUserSchema = mongoose.Schema({
    login: {
        type: String,
        required: true,
        trim: true,
        unique:true
    },

    password: {
        type: String,
        required: true
    },
    cardNumber: {
        type : Number,
        required:true
    }
},
    {
        timestamps: true
    })
module.exports = mongoose.model("streamer", streamUserSchema)