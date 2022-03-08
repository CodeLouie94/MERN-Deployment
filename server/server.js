//IMPORT PACKAGES
const express = require("express");
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser')
require('dotenv').config();


//CONFIG MONGOOSE
require("./config/mongoose.config");

//CONFIG EXPRESS
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(express.json(), express.urlencoded({extended:true}));
app.use(cookieParser())

//ROUTES
// require("./routes/game.routes")(app)
require("./routes/user.routes")(app)
require("./routes/game.routes")(app)

//LISTEN TO PORT
const port = 8000;
app.listen(port, () => console.log('Listening on port: 8000') );