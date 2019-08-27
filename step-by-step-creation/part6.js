router.route('/posts').delete(function(req,res) { // why do I need this?
    mongo.removeDocument({},"posts",()=> {
        res.status(200).send("successfully removed the post")
    })
})