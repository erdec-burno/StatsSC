var express = require('express');
var fs = require('fs');
var path = require('path');
//var bodyParser = require('body-parser');
var router = express.Router();
const TotalSeats = 12756;
const TotalSeatsFanZone = 570;

//var urlencodedParser = bodyParser.urlencoded({ extended: false });
/* GET home page. */
router.get('/', function(req, res, next) {
    var data = fs.readFileSync("data.txt");
    var stats = JSON.parse(data);
    //console.log(stats);
    var percentageTotal = (stats.field1 * 100) / TotalSeats;
    var str1 = Math.round(percentageTotal) + "%  " + TotalSeats;
    var percentageTotalFanZone = (stats.field2 * 100) / TotalSeatsFanZone;
    var str2 = Math.round(percentageTotalFanZone) + "%  " + TotalSeatsFanZone;
  res.render('index', { stats: stats, totalseats: str1, totalseatsfanzone: str2, autorefresh: true});
});

router.get('/add', function(req, res, next) {
    //var data = fs.readFileSync(path.resolve()+"\\data.txt");
    var data = fs.readFileSync("data.txt");
    var stats = JSON.parse(data);
    //console.log(__dirname);
    //console.log(path.resolve());
    //var stats = {field1: "300", field2: '180', field3: '750'};
    res.render('forma', { stats: stats });
});

router.post('/add', function(req, res, next) {
    var date = new Date();
    var time =  date.getHours() + ":" + date.getMinutes(); // + ":" + date.getSeconds();
    var dataform = {field1: req.body.field1, field2: req.body.field2, time: time};
        console.log(dataform);
    /*if (req.body.field1 && req.body.field2) {
        console.log(req.body);
    }*/
    //var stats = {field1: req.body.field1, field2: req.body.field2, field3: req.body.field3};
    res.render('forma', { stats: dataform });

    fs.writeFile("data.txt", JSON.stringify(dataform), function(err) {
            if(err) {
                return console.log(err);
            }

            console.log("The file was saved!");
    });
});


module.exports = router;
