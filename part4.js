router.route('/posts').post(function(req, res) { // why do I need this?
    req.body.likes = 0;
    mongo.insertDocument(req.body,"posts", ()=> {
        console.log("added the post");
        res.status(200).send("successfully added the post");
    });
})