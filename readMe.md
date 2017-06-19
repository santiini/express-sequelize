## Sequelize Orm 学习总结

#### 1.expreee 中 supervisor的使用

> 更改package.json 的启动指令:

`
	node ./bin/www  ====>  supervisor --harmony ./bin/www
`

#### 2. sequelize.define(tablename, {attribute}, {options})

> 1.sequelize.define() 并不能在 mysql中建表;

> 2.只是建立了 sequelize 和 mysql 的映射关系;