var express = require('express');
var fs = require('fs');
var path = require('path');
//var bodyParser = require('body-parser');
var router = express.Router();
const TotalSeats = 12756;
const TotalSeatsGuestFanZone = 570;
const TotalSeatsHomeFanZone = 546;

//var urlencodedParser = bodyParser.urlencoded({ extended: false });
router.get('/', function(req, res, next) {
    try {
        var data = fs.readFileSync("data.txt");
        var stats = JSON.parse(data);
        var percentageTotal = (stats.total * 100) / TotalSeats;
        var str1 = Math.round(percentageTotal) + "%  " + TotalSeats;
        var percentageTotalFanZone1 = (stats.guestfanzone * 100) / TotalSeatsGuestFanZone;
        var guestfanzone = Math.round(percentageTotalFanZone1) + "%  " + TotalSeatsGuestFanZone;
        var percentageTotalFanZone2 = (stats.homefanzone * 100) / TotalSeatsHomeFanZone;
        var homefanzone = Math.round(percentageTotalFanZone2) + "%  " + TotalSeatsHomeFanZone;
    } catch (err) {
    }
  res.render('index', { stats: stats, totalseats: str1, guestfanzone: guestfanzone, homefanzone: homefanzone, autorefresh: true, title: 'Main page'});
});

router.get('/add', function(req, res, next) {
    //var data = fs.readFileSync(path.resolve()+"\\data.txt");
    try {
        var data = fs.readFileSync("data.txt");
        var stats = JSON.parse(data);
    } catch (err) {
    }
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
    var dataform = {total: req.body.total, homefanzone: req.body.homefanzone, guestfanzone: req.body.guestfanzone, time: time};
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
