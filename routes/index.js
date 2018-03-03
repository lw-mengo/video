var express = require('express');
var router = express.Router();
var request = require('request');

/* GET home page. */
router.get('/', function (req, res) {
    // request("http://localhost:8080/videoapi/getIndexApi", function (error, response, body) {
    //     if (!error && response.statusCode == 200) {
    //         console.log(body);
    //         var data = JSON.parse(body);
    //         res.render("index",{index_data:data});
    //     }
    // });

    var url = "https://api.bgm.tv/calendar";
    request(url,function (error,response,body) {
       if (!error&&response.statusCode==200){
           var data = JSON.parse(body);
           res.render("index",{mydata:data});
       }
    });
   // res.render("index");

});

router.get("/test",function (req,res) {
    res.render("test");
});

module.exports = router;
