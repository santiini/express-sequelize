var express = require('express');
var router = express.Router();
const User = require('../controllers/users');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

// 添加用户;
router.get('/add', User.addUser0);
// 添加用户2;
router.get('/add2', User.addUser);
// 搜索用户; 
router.get('/search', User.searchUser);

// 测试接口;
router.get('/all', User.getUser);
router.get('/add3', User.addUser3);
router.get('/add4', User.addUser4);
router.get('/getone', User.findOne);
router.get('/getsql', User.findSql);
router.get('/player', User.getPlayer);

module.exports = router;