const Games = require("../controllers/game.controller");

module.exports = app => {
    app.get("/api/games", Games.allGames)
    app.get("/api/games/:id", Games.oneGame)
    app.get("/api/games/title/:title", Games.oneGamebyName)
}