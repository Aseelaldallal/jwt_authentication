


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
// fromAuthHeaderAsBearerToken() creates a new extractor that looks for the JWT in the authorization header with the scheme 'bearer'
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken(); // When making a request, pass bearer <token> in header
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


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.json({ message: "Express is up!" });
});

// Login Route
app.post('/login', (req, res) => {
    if (req.body.name && req.body.password) {
        var name = req.body.name; // var not const - to avoid block scope
        var password = req.body.password;
    }
    const user = users[_.findIndex(users, { name: name })]; // usually a db call
    if (!user) {
        res.status(401).json({ message: "no such user found" });
    }
    if (user.password === req.body.password) {
        // from now on we'll dientify the user by the id and the id is the only personalized value that goes into our token
        var payload = { id: user.id };
        var token = jwt.sign(payload, jwtOptions.secretOrKey); // using jwtwebpackage
        res.json({ message: "ok", token: token });
    } else {
        res.status(401).json({ message: "passwords did not match" });
    }
});

// Accessing the passport-jwt protected api route
app.get("/secret", passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json("Success! You can not see tihs without a token!");
});

// Just for debugging
app.get("/secretDebug", (req, res, next) => {
    console.log(req.get('Authorization'));
    next()
}, (req, res) => {
    res.json('debugging');
})

app.listen(3000, () => {
    console.log("Express is running");
})