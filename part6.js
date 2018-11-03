router.route('/posts').delete(function(req,res) {
    mongo.removeDocument({},"posts",()=> {
        res.status(200).send("successfully removed the post")
    })
})