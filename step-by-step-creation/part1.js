const bodyParser = require('body-parser') // where did I find these packages?
const express = require("express"); // the express library makes setting up a server very easy
const app = express(); // this creates the server
const router = express.Router(); // this is a signpost, think of a computer router, routes networks, or think of a signpost
const port = 4000;
const mongo = require('./mongowrapper'); // dont forget to set up mongo server!