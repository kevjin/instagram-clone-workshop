const bodyParser = require('body-parser')
const express = require("express");
const app = express();
const router = express.Router();
const port = 4000;
const mongo = require('./mongowrapper');