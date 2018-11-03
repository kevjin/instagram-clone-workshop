// This code right here is magic!
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/', express.static('public'))

app.use('/api', router);
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
// ^^ Magic code!!