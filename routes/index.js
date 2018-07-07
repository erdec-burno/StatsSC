var express = require('express');
var fs = require('fs');
var path = require('path');
//var bodyParser = require('body-parser');
var router = express.Router();

//var urlencodedParser = bodyParser.urlencoded({ extended: false });
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/add', function(req, res, next) {
    //var data = fs.readFileSync(path.resolve()+"\\data.txt");
    var data = fs.readFileSync("data.txt");
    //path.join(__dirname, 'public')

    var stats = JSON.parse(data);
    console.log(__dirname);
    console.log(path.resolve());
    //var stats = {field1: "300", field2: '180', field3: '750'};
    res.render('forma', { stats: stats });
});

router.post('/add', function(req, res, next) {
    // Fix time !!! Не забудь добавить эти данные в файл! :)
    if (req.body.field1 && req.body.field1 && req.body.field1) {
        console.log(req.body);
    }

    //var stats = {field1: req.body.field1, field2: req.body.field2, field3: req.body.field3};
    res.render('forma', { stats: req.body });

    fs.writeFile("data.txt", JSON.stringify(req.body), function(err) {
            if(err) {
                return console.log(err);
            }

            console.log("The file was saved!");
    });
});


module.exports = router;
