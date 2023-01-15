const express = require('express');
const morgan = require('morgan');
const db = require('./config/database')
const culturalAgentRouter = require('./routes/culturalAgent.routes.js');
const authRouter = require('./routes/auth.routes.js');
// const config = dotenv.parse(env);

const app = express();

//Cors policy
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

//Middleware
app.use(morgan('dev'));
app.use(express.urlencoded({
    extended: false
}));
app.use(express.json());

//Routes
app.use(culturalAgentRouter);
app.use(authRouter);

app.listen('3000', () => {
    console.log("Listen on port 3000");
});