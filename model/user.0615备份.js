/**
 * user Model；
 */
const Sequelize = require('sequelize');
const config = require('../config/config');
const BaseModel = require('./base');

// 第一步，创建一个sequelize对象实例, 初始化时设置一个连接池;
const sequelize = new Sequelize(
    config.db.database, // 数据库名称;
    config.db.user, // 数据库的用户名;
    config.db.password, // 数据库密码;
    {
        dialect: 'mysql',
        host: config.db.config,
        port: config.db.port
    }
);

// 第二步，定义模型Pet，告诉Sequelize如何映射数据库表：
// 1.用sequelize.define()定义Model时，传入名称pet，默认的表名就是pets。
// 2.第二个参数指定列名和数据类型，如果是主键，需要更详细地指定。
// 3.第三个参数是额外的配置，我们传入{ timestamps: false }是为了关闭Sequelize的自动添加timestamp的功能。

// model定义格式为sequelize.define('name', {attributes}, {options});
const User = sequelize.define('user', {
    id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        defaultValue: BaseModel.uid()
    },
    mail: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    passwd: {
        type: Sequelize.STRING(20),
        allowNull: false
    },
    name: {
        type: Sequelize.STRING(20),
        allowNull: true
    }
}, {
    indexes: [{
            name: 'index_user_1',
            fields: ['mail'],
            uniq: true
        },
        {
            name: 'index_user_2',
            fields: ['mail', 'passwd']
        }
    ],
    getterMethods: {
        to_dict: function() {
            return {
                id: this.id.toString(),
                name: this.name
            }
        }
    }
});

// sequelize.define() - 模型定义: 
// 这个实例方法用于定义一个新Model（模型）。Model相当于数据库中的表，该对象不能通过构造函数实例化;
// 表中的字段通过第二个参数对象attributes来定义，对象中的一个属性相当于表中的一个字段。

const Pet = sequelize.define('pet', {
    id: {
        type: Sequelize.STRING(50),
        primaryKey: true
    },
    name: Sequelize.STRING(100),
    gender: Sequelize.BOOLEAN,
    birth: Sequelize.STRING(10),
    createdAt: Sequelize.BIGINT,
    updatedAt: Sequelize.BIGINT,
    version: Sequelize.BIGINT
}, {
    timestamps: false
});

//sequelize.define: 定义一个模型，该模型是一个建立了与数据表关系的对象;
// 被定义的表中的列在该方法的第二个参数中定义，可以理解为每个属性对应一个表的字段;


// module.exports = User;
module.exports = {
    User,
    Pet
};