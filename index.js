


const express = require('express');
const app = express();

const _ = require("lodash");
const bodyParser = require("body-parser");
const jwt = require('jsonwebtoken');

const passport = require('passport');
const passportJWT = require("passport-jwt");
const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.strategy;


app.get("/", (req, res) => {
    res.json({ message: "Express is up!" });
});

app.listen(3000, () => {
    console.log("Express is running");
})