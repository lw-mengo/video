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

router.get("/info",function (req,res) {
    var subject =req.query.subject;
    console.log(subject);
    var base_url ="https://api.bgm.tv/subject/"+subject;
    request(base_url,function (error,response,body) {
        if (!error&&response.statusCode==200){
            var data = JSON.parse(body);
            res.render("bangumi_info",{bangumi_info:data});
        }
    });
 //   res.render("bangumi_info");
});

module.exports = router;
