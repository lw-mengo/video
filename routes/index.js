var express = require('express');
var router = express.Router();
var request = require('request');
var rp = require('request-promise');

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
    request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var data = JSON.parse(body);
            console.log(body);
            console.log(data[0]);
            console.log(data[5].items[0].images.small);
            res.render("index", {mydata: data});
        }
    });
    // res.render("index");

});

router.get("/test", function (req, res) {
    request("http://localhost:8080/subject//new/18", function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body);
        } else if (response.statusCode == 404) {
            console.log(response.statusCode);
            console.log("not found this subject");
        }
    });
    res.render("test");
});

// function getInfo(url) {
//      return rp(url).then(function (value) {
//         //console.log(value);
//         //res.render("bangumi_info",{bangumi_info:value});
//         return value;
//     }).catch(function (reason) {
//         console.log(reason);
//     }).then(rp);
// };

// function getInfo(uri,uri2,m,n) {
//     rp(uri).then(function (value) {
//         m = value;
//     }).then(rp(uri2).then(function (value) {
//         n = value;
//     })).catch(function (reason) {
//
//     });
//
//     return ;
// }

router.get("/info", function (req, res) {
    var subject = req.query.subject;
    var options = {
        uri: "https://api.bgm.tv/subject/" + subject,
        method: "GET",
        json: true
    };
    var options_1 = {
        uri: "https://api.bgm.tv/subject/" + subject + "/ep",
        method: "GET",
        json: true
    };
    var options_2 = {
        uri: "http://localhost:8080/subject" + subject,
        method: "GET",
        json: true
    };
    var bangumi_info, ep_info, video_info;
    rp(options).then(function (value) {
            bangumi_info = value;
            //res.render("bangumi_info",{bangumi_info:value});
        }
    ).then(rp(options_1).then(function (value) {
            ep_info = value;
            res.render("bangumi_info", {bangumi_info: bangumi_info, ep: ep_info, episode: video_info, aid: subject});
        })
    ).then(rp(options_2).then(function (value) {
            video_info = JSON.parse(value.url);
        })
    ).catch(function (reason) {
        console.log(reason);
    });

// .then(rp(options_2).then(function (value) {
//     video_info = JSON.parse(value.url);
//     console.log("3333");
//     res.render("bangumi_info", {bangumi_info: bangumi_info, ep: ep_info, episode: video_info});
    /**优化一下代码**/


    //  rp(url).then(function (value) {
    //    console.log(value);
    //    res.render("bangumi_info",{bangumi_info:value});
    //    next();
    // }).catch(function (reason) {
    //     console.log(reason);
    // });


    // var subject =req.query.subject;
    // console.log(subject);
    // var base_url ="https://api.bgm.tv/subject/"+subject;
    // request(base_url,function (error,response,body) {
    //     if (!error&&response.statusCode==200){
    //         var data = JSON.parse(body);
    //         res.render("bangumi_info",{bangumi_info:data});
    //     }
    // });
    //res.render("bangumi_info");

});

router.get("/new_info", function (req, res) {
    var subject = req.query.subject;

    var url = "https://api.bgm.tv/subject/" + subject;
    var url1 = "https://api.bgm.tv/subject/" + subject + "/ep";
    var url2 = "http://localhost:8080/subject/new/" + subject;

    var api1 = rp(url);
    var api2 = rp(url1);
    var api3 = rp(url2);
    Promise.all([api1,api2,api3])
        .then(function (results) {
            var bangumi_info = JSON.parse(results[0]);
            var ep_info = JSON.parse(results[1]);
            var temp = JSON.parse(results[2]);
            // console.log(temp);
          //  var temp1 = JSON.parse(temp);
            var video_info = JSON.parse(temp.video_url);
            // console.log(bangumi_info);
            // console.log(ep_info);
            // console.log(video_info);
            res.render("newbangumi_info", {bangumi_info: bangumi_info, ep: ep_info, episode: video_info, aid: subject});
        }).catch(function (reason) {
            console.log(reason);
    });
    // var options = {
    //     uri: "https://api.bgm.tv/subject/" + subject,
    //     method: "GET",
    //     json: true
    // };
    // var options_1 = {
    //     uri: "https://api.bgm.tv/subject/" + subject + "/ep",
    //     method: "GET",
    //     json: true
    // };
    // var options_2 = {
    //     uri: "http://localhost:8080/subject/new/" + subject,
    //     method: "GET",
    //     json: true
    // };
    // var bangumi_info, ep_info, video_info;
    // rp(options).then(function (value) {
    //         bangumi_info = value;
    //         console.log("1---->" + value);
    //         //res.render("newbangumi_info", {bangumi_info: bangumi_info, ep: ep_info, episode: video_info, aid: subject});
    //     }
    // ).catch(function (reason) {
    //     console.log(reason);
    // });
    // rp(options_1).then(function (value) {
    //     console.log("2----->" + value);
    //     ep_info = value;
    //     //res.render("newbangumi_info", {bangumi_info: bangumi_info, ep: ep_info, episode: video_info, aid: subject});
    // }).catch(function (reason) {
    //     console.log(reason);
    // });
    //
    // rp(options_2).then(function (value) {
    //     console.log("3---->" + value);
    //     video_info = JSON.parse(value.video_url);
    //     //res.render("newbangumi_info", {bangumi_info: bangumi_info, ep: ep_info, episode: video_info, aid: subject});
    // }).catch(function (reason) {
    //     console.log(reason);
    // });
    //
    // var my_url ="https://api.bgm.tv/subject/" + subject;
    // var url1 = "https://api.bgm.tv/subject/" + subject + "/ep";
    // var url2 = "http://localhost:8080/subject/new/" + subject;
    // var bangumi_info, ep_info, video_info;
    // function getData(f1,f2,f3){
    //     f1();
    //     f2();
    //     f3();
    // }
    // function getA() {
    //     request(my_url,function (error,response,body) {
    //         if (!error&&response.statusCode==200){
    //             console.log("function A");
    //             bangumi_info = JSON.parse(body);
    //             return bangumi_info;
    //         }else{
    //             console.log(error);
    //         }
    //     });
    // }
    //
    // function getB() {
    //     request(url1,function (error,response,body) {
    //         if (!error&&response.statusCode==200){
    //             console.log("function B");
    //             ep_info = JSON.parse(body);
    //             return ep_info;
    //         }else{
    //             console.log(error);
    //         }
    //     });
    // function getC() {
    //     request(url2,function (error,response,body) {
    //         if (!error&&response.statusCode==200){
    //             console.log("function C");
    //             video_info = JSON.parse(body.video_url);
    //             return video_info;
    //         }else{
    //             console.log(error);
    //         }
    //     });
    // }
    //
    // getData(getA,getB,getC);
    //     res.render("newbangumi_info", {bangumi_info: bangumi_info, ep: ep_info, episode: video_info, aid: subject});
    //
    // }


// .then(rp(options_2).then(function (value) {
//     video_info = JSON.parse(value.url);
//     console.log("3333");
//     res.render("bangumi_info", {bangumi_info: bangumi_info, ep: ep_info, episode: video_info});
    /**优化一下代码**/
});

router.get("/watch", function (req, res) {
    var ep = req.query.episode;
    var subject = req.query.subject;
    var options = {
        uri: "http://localhost:8080/subject/" + subject,
        method: "GET",
        json: true
    };
    rp(options).then(function (value) {
        var link = JSON.parse(value.url);
        var url = link.episodeList[ep].videoLink;
        res.render("watch", {url: url});
    }).catch(function (reason) {
        console.log(reason);
    });
    // res.render("watch");
});


router.get("/new_watch", function (req, res) {
    var ep = req.query.episode;
    var subject = req.query.subject;
    var options = {
        uri: "http://localhost:8080/subject/new/" + subject,
        method: "GET",
        json: true
    };
    rp(options).then(function (value) {
        var link = JSON.parse(value.video_url);
        var url = link.episodeList[ep].videoLink;
        res.render("new_watch", {url: url});
    }).catch(function (reason) {
        console.log(reason);
    });
    // res.render("watch");
});
module.exports = router;
