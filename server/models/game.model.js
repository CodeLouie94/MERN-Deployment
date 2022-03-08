const mongoose = require('mongoose')

const GameSchema = new mongoose.Schema({
    title:String,
    price:Number,
    description: String,
    image: String,
},{timestamps: true})

const Game = mongoose.model('Game', GameSchema)

module.exports = Game