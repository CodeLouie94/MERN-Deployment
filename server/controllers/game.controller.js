const Game = require("../models/game.model")

//Show all
module.exports.allGames = (req, res) => {
    Game.find()
        .then(allGames => {
            res.json(allGames)
        })
        .catch(err => res.json({message: "Something went wrong", error: err}))
}

//Show one
module.exports.oneGame = (req, res) => {
    const id = req.params.id
    Game.findOne({_id: id})
        .then(game => res.json(game))
        .catch(err => res.status(400).json(err))
}

//Show one by name
module.exports.oneGamebyName = (req, res) => {
    let title = req.params.title
    title = title.toUpperCase()
    Game.find({title: title})
        .then(game=> res.json(game))
        .catch(err => res.status(400).json(err))
}