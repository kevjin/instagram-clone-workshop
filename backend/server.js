require('dotenv').config();
const bodyParser = require('body-parser')
const express = require("express")
const app = express(); //server object
const router = express.Router();
const port = process.env.PORT || 4000;
const mongo = require('./mongowrapper')

app.set('port', port);

app.listen(port, () => {
    mongo.openConnection();
    console.log(`App is running on port ${port}`);
})

// ------------------ This block of code right here is magic, don't worry about it!
// Necessary middleware for CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Serve the HTML/CSS files to the client.
app.use('/', express.static('public'))

app.use('/api', router);
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
// ------------------ This block of code right here is magic, don't worry about it!

router.route('/posts').post(function (req,res) {
    req.body.likes = 0;
    mongo.insertDocument(req.body, "posts").then(() => {
        res.status(200).send("successfully created the post")
    }).catch(() => {
        res.status(500).send("failed to create post")
    })
})

router.route('/posts').get(function(_, res) {
    mongo.findDocuments({},"posts").then((data) => {
        res.status(200).send(data)
    }).catch(() => {res.status(500).send("failed to get posts")})
});