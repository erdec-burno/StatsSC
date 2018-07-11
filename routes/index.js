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
    var percentageTotal = (stats.field1 * 100) / TotalSeats;
    var str1 = Math.round(percentageTotal) + "%  " + TotalSeats;
    var percentageTotalFanZone = (stats.field2 * 100) / TotalSeatsFanZone;
    var str2 = Math.round(percentageTotalFanZone) + "%  " + TotalSeatsFanZone;
  res.render('index', { stats: stats, totalseats: str1, totalseatsfanzone: str2, autorefresh: true, title: 'Main page'});
});

router.get('/add', function(req, res, next) {
    //var data = fs.readFileSync(path.resolve()+"\\data.txt");
    var data = fs.readFileSync("data.txt");
    var stats = JSON.parse(data);
    res.render('forma', { stats: stats, title: 'Add data...' });
});

router.post('/add', function(req, res, next) {
    var date = new Date();
    var minutes;
    if (date.getMinutes()<9)
        minutes = "0" + date.getMinutes()
    else
        minutes = date.getMinutes();

    var time =  date.getHours() + ":" + minutes; // + ":" + date.getSeconds();
    var dataform = {field1: req.body.field1, field2: req.body.field2, time: time};
    //console.log(dataform);
    res.render('forma', { stats: dataform, title: 'Add data...' });

    fs.writeFile("data.txt", JSON.stringify(dataform), function(err) {
            if(err) {
                return console.log(err);
            }

            console.log("The file was saved!");
    });
});


module.exports = router;
