router.route('/posts').get(function(req, res) { // why do I need this?
    mongo.findDocuments({},"posts", (data)=> {
        res.status(200).send(data)
    })
});