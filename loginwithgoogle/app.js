const express = require('express');
const app = express();
const session = require('express-session');
const passport = require('passport');
const port = 9800;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

app.use(session({
    secret: 'SUPERSECERT',
    resave:false,
    saveUninitialized:true
}))