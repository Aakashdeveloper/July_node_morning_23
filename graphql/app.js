const express = require('express');
const port = 8600;
const app = express();
const {graphqlHTTP} = require('express-graphql');
const schema = require('./Schema/Schema');