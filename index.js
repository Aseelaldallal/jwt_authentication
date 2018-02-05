


const express = require('express');
const app = express();

const _ = require("lodash");
const bodyParser = require("body-parser");
const jwt = require('jsonwebtoken');

const passport = require('passport');
const passportJWT = require("passport-jwt");
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

// This normally would come from the db. Faking it here.
let users = [
    {
        id: 1,
        name: 'Aseel',
        password: '!hi!'
    },
    {
        id: 2,
        name: 'test',
        password: 'blahtest'

    }
]


// Passport strategies are middleware functions that requests run through before getting to the actual route.
// If authentication strategy fails, route will not be called and a 401 unauthorized response will be sent.
let jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = 'bloooper';

const strategy = new JwtStrategy(jwtOptions, (jwt_payload, next) => {
    console.log('payload recieved: ', jwt_payload);
    let user = users[_.findIndex(users, { id: jwt_payload.id })];
    if (user) {
        next(null, user);
    } else {
        next(null, false);
    }
});

passport.use(strategy);




app.get("/", (req, res) => {
    res.json({ message: "Express is up!" });
});

app.listen(3000, () => {
    console.log("Express is running");
})