import express from 'express'
import { connectDb, createTable } from './Helper/dbHelper.js'
import { createTableSqlList } from './Database/createTable.js'
import { addConstGroup, getConstGroupList, deleteConstGroup } from './Service/Config/ConstGroup.js'

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

  app.get('/', (req, res) => {
    res.send('Hello World!')
  })

  app.post('/config/constGroup/add', function (req, res) {
    let result = addConstGroup(req.body);
    res.send(result)
  })

  app.post('/config/constGroup/get', async function (req, res) {
    let result = await getConstGroupList();
    res.send(result)
  })

  app.post('/config/constGroup/delete', async function (req, res) {
    let result = await deleteConstGroup(req.body.groupId);
    res.send(result)
  })

  app.listen(port, () => {
    console.log(`程序已启动，请访问${port}端口`)
  })
}

const init = async () => {
  await initDb();
  initExpress();
}

init();