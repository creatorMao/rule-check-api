import express from 'express'
import { connectDb, createTable } from './Helper/dbHelper.js'
import { createTableSqlList } from './Database/createTable.js'
import { calcPageRowRange } from './Helper/pageHelper.js'
import { addConstGroup, getConstGroupList, deleteConstGroup, editConstGroup } from './Service/Config/ConstGroup.js'

const initDb = async () => {

  console.log('正在连接数据库');
  const db = connectDb('./Database/basedb.db');
  console.log('数据库连接成功');

  console.log('正在初始化数据库');
  for (let i = 0; i < createTableSqlList.length; i++) {
    let table = createTableSqlList[i];
    await createTable(db, table.tableCode, table.tableName, table.sql);
  }
  console.log('数据库初始化成功');

  return db;
}

const initExpress = () => {
  const app = express()
  const port = 3000

  app.use(express.json())
  app.use(express.urlencoded({ extended: false }))

  app.all('*', (req, res, next) => {
    // google需要配置，否则报错cors error
    res.setHeader('Access-Control-Allow-Credentials', 'true')
    // 允许的地址,http://127.0.0.1:9000这样的格式
    res.setHeader('Access-Control-Allow-Origin', "*")
    // 允许跨域请求的方法
    res.setHeader(
      'Access-Control-Allow-Methods',
      'POST, GET, OPTIONS, DELETE, PUT'
    )
    // 允许跨域请求header携带哪些东西
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, If-Modified-Since'
    )
    next()
  })

  // #region 测试接口
  app.get('/', (req, res) => {
    res.send('Hello World!')
  })
  // #endregion

  // #region 常量组
  app.post('/config/constGroup/add', function (req, res) {
    res.send(addConstGroup(req.body))
  })

  app.post('/config/constGroup/get', async function (req, res) {
    const page = calcPageRowRange(req.body.pageSize, req.body.pageIndex)
    res.send(await getConstGroupList(page))
  })

  app.post('/config/constGroup/delete', function (req, res) {
    const idList = JSON.parse(req.body.idList)
    res.send(deleteConstGroup(idList))
  })

  app.post('/config/constGroup/edit', function (req, res) {
    res.send(editConstGroup(req.body))
  })
  // #endregion

  app.listen(port, () => {
    console.log(`程序已启动，请访问${port}端口`)
  })
}

const init = async () => {
  await initDb();
  initExpress();
}

init();