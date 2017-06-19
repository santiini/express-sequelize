/**
 * controllers;
 */
const { Pet, User, sequelize, Team, Player } = require('../model/user');

// 不利用async, 只用Sequelize;
function addUser0(req, res, next) {
    const now = Date.now();

    return Pet.create({
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
}

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

// test接口;
async function getUser(req, res, next) {
    try {
        const result = await User.findAll();
        res.send({
            success: true,
            data: result
        })
    } catch (err) {
        console.log(err)
        res.send({
            success: false,
            error: err.message
        })
    }
}

function addUser4(req, res, next) {
    // tips: User.sync() 如果数据库中没有建立 users 表的话， 会自动建表;
    User.sync({ force: true })
        .then(() => {
            return User.create({
                username: 'sunxt11',
                // birthday: '1989/12/07',
                firstName: 'xiaotao',
                lastName: 'sun',
                // 由于在 Sequelize.define 中配置了getters, setters, 这里创建成功后会自动触发setters, 和getters;
                // tips: 1. 但是， 接口获得的 name 字段和 sql 中的存储字段是不一样的;
                name: 'sun',
                smartName: 'songtao11'
            })
        })
        .then(() => {
            res.send({
                success: true,
                msg: 'OK'
            })
        })
        .catch(err => {
            console.log(err)
            res.send({
                success: false,
                error: err.message
            })
        })
}

async function findOne(req, res, next) {
    try {
        const result = await User.findOne();
        res.send({
            success: true,
            data: result
        });
    } catch (err) {
        console.log(err);
        res.send({
            success: false,
            error: err.message
        })
    }
}

async function findSql(req, res, next) {
    try {
        // 引入Sequelize的实例sequelize, 可以调用 sequelize.query(sql, {options});
        const result = await sequelize.query('SELECT * FROM USERS');
        res.send({
            success: true,
            data: result
        });
    } catch (err) {
        console.log(err);
        res.send({
            success: false,
            error: err.message
        });
    }
}

async function addUser3(req, res, next) {
    try {
        const result = await addUser4();
        res.send({
            success: true,
            msg: 'OK!'
        })
    } catch (err) {
        console.log(err)
        res.send({
            success: false,
            error: err.message
        })
    }
}

// 关联查询;
async function getPlayer(req, res, next) {
    try {
        // sync(): 不会返还数据;
        // const result1 = await Player.sync()
        // const result2 = await Team.sync({ force: true }) // tips: {force: true} 会强制删除原有的表，建立新表;
        // const result2 = await Team.sync()

        const result = await Player.findAll({
            // 关联查询： 一对一;
            include: [Team]
        });
        res.send({
            success: true,
            data: result
        })
    } catch (err) {
        console.log(err);
        res.send({
            success: false,
            error: err.message
        })
    }
}

module.exports = {
    addUser0,
    addUser,
    searchUser,
    getUser,
    addUser3,
    addUser4,
    findOne,
    findSql,
    getPlayer
};