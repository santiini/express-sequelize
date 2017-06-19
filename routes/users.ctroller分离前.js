var express = require('express');
var router = express.Router();
const { Pet } = require('../model/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

// 添加用户;
router.get('/add', (req, res, next) => {
    const now = Date.now();

    Pet.create({
            id: 'g-' + now,
            name: 'Santiiny',
            gender: false,
            birth: '2007-07-07',
            createdAt: now,
            updatedAt: now,
            version: 0
        })
        .then(p => {
            console.log('created' + JSON.stringify(p))
            res.send('succeed!')
        })
        .catch(err => {
            console.log('failed' + err);
            res.send(err);
        });
});

// 添加用户2;
router.get('/add2', addUser);
router.get('/search', searchUser);

// 添加用户方法;
async function addUser(req, res, next) {
    try {
        const now = Date.now();
        const result = await Pet.create({
            id: 'd-' + now,
            name: 'wangjie',
            gender: false,
            birth: '2008-08-08',
            createdAt: now,
            updatedAt: now,
            version: 0
        });
        console.log('created:' + JSON.stringify(result))
        res.send({
            success: true,
            data: result
        });
    } catch (err) {
        console.log(err.stack);
        res.send({
            success: false,
            error: err.message
        });
    }
}

// 查找用户;
async function searchUser(req, res, next) {
    try {
        const result = await Pet.findAll({
            where: {
                name: 'Santiiny'
            }
        });
        console.log(result);
        res.send({
            success: true,
            data: result
        });
    } catch (err) {
        console.log(err.stack);
        res.send({
            success: false,
            error: err.message
        })
    }
}


module.exports = router;