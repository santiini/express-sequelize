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
// tips: 1. sequelize.define只是建立了model和sql 之间的映射关系， 并不能直接在sql中建表，还是得手动建表;
const User = sequelize.define('users', {
    // 数据列的属性;
    username: Sequelize.STRING,
    birthday: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW // 日期默认值 => 当前时间
    },
    flag: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    firstName: {
        type: Sequelize.STRING,
        field: 'first_name' /* User模型拥有firstName属性，在数据库中相应的属性为first_name  */
    },
    lastName: {
        type: Sequelize.STRING
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false, // Sequelize 自带的非空验证，不允许为空;
        get: function() {
            const smartName = this.getDataValue('smartName');
            return this.getDataValue('lastName') + ' ' + smartName;
        }
    },
    smartName: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '', // 非空验证，为自动添加为默认值;
        set: function(val) {
            this.setDataValue('smartName', val.toUpperCase());
        }
    }
    // state: {
    //     type: Sequelize.ENUM,
    //     values: [1, 0]
    // }
}, {
    // 数据库中表的配置;
    freezeTableName: true,
    /* 数据库表名与模型名字一致 */
    timestamps: false, // 不增加 TIMESTAMP 属性  (updatedAt, createdAt)
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


// demo4;  表表关联--一对多多对多;

const Player = sequelize.define('player', {
    name: {
        type: Sequelize.STRING
    },
    id: {
        type: Sequelize.CHAR(10),
        allowNull: false,
        // unique: true,
        primaryKey: true,
        // autoIncrement: true
    }
}, {
    timestamps: false
});

const Team = sequelize.define('team', {
    uuid: {
        type: Sequelize.UUID,
        allowNull: false,
        // unique: true,
        primayKey: true,
        defaultValue: 1
            // autoIncrement: true
    },
    name: Sequelize.STRING
}, {
    timestamps: false
});

// tips：关联模型;
// tips: 大多数 1:1关系中通常会使用BelongsTo 关联，因为BelongsTo 会在源模型中添加外键，而HasOne 则会在目标模型中添加外键。
Player.belongsTo(Team, { // player 添加 teamId 属性;
    // as: 会为 player添加 team_id 属性而不是 teamId;
    // as: 'team_id',
    // foreignKey: 外键名都会使用此选项值, 为Player 添加fk_team 外键;
    // foreignKey: 'fk_team',
    // targetKey: 目标键是位于目标模型上通过源模型外键列指向的列, 默认情况下，目标键是会belongsTo关系中目标模型的主键;
    // targetKey: 'uuid'
});
// Team.hasOne(Player);

// module.exports = User;
module.exports = {
    User,
    Pet,
    sequelize,
    Player,
    Team
};