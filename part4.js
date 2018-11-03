router.route('/posts').post(function(req, res) {
    req.body.likes = 0;
    console.log("what up");
    mongo.insertDocument(req.body,"posts", ()=> {
        console.log("added the post");
        res.status(200).send("successfully added the post");
    });
})