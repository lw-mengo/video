var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
/*测试下回调函数数组处理路由*/
//
// var cb0 = function (req,res,next) {
//     console.log("CB-0");
//     var hello = "hello";
//     res.send(hello);
//     return hello;
//     next();
// };
// var cb1 = function (req,res,next) {
//     console.log("CB-1");
//     var world = "world";
//     return world;
//     next();
// };
// var cb2 = function (req,res) {
//     console.log("cb-3");
//     res.send("hello world!");
// };
// router.get('/my_test',[cb0,cb1,cb2]);
//
//

// router.use(function timeLog(req,res,next) {
//     console.log("time",Date.now());
//     next();
// });
// router.get("/my_test",function (req,res) {
//     res.send("Birds home page");
// });
router.get("/my_test/:id",function (req,res,next) {
   console.log("ID",req.params.id);
   next();
},function (req,res,next) {
    res.send("User Info");
});

router.get("/my_test/:id",function (req,res,next) {
   res.end(req.params.id);
});

module.exports = router;
