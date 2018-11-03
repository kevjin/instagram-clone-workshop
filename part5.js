router.route('/posts').get(function(req, res) {
    mongo.findDocuments({},"posts", (data)=> {
        res.status(200).send(data)
    })
});