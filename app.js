import express from 'express'
import { connectDb, createTable } from './Helper/dbHelper.js'
import { createTableSqlList } from './Database/createTable.js'
import { calcPageRowRange } from './Helper/pageHelper.js'
import {
  addConstGroup,
  getConstGroupDetail,
  getConstGroupList,
  deleteConstGroup,
  editConstGroup
} from './Service/Config/Const/ConstGroup.js'
import {
  addConst,
  getConstDetail,
  getConstList,
  deleteConst,
  editConst
} from './Service/Config/Const/Const.js'
import {
  addReqParam,
  deleteReqParam,
  editReqParam,
  getReqParamList,
  getReqParamDetail
} from './Service/Config/ReqParam/ReqParam.js'
import {
  addReqParamGroup,
  deleteReqParamGroup,
  editReqParamGroup,
  getReqParamGroupList,
  getReqParamGroupDetail,
} from './Service/Config/ReqParam/ReqParamGroup.js'

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

  app.post('/config/constGroup/list', async function (req, res) {
    const page = calcPageRowRange(req.body.pageSize, req.body.pageIndex)
    res.send(await getConstGroupList(page))
  })

  app.post('/config/constGroup/detail', async function (req, res) {
    res.send(await getConstGroupDetail(req.body.id))
  })

  app.post('/config/constGroup/delete', function (req, res) {
    const idList = JSON.parse(req.body.idList)
    res.send(deleteConstGroup(idList))
  })

  app.post('/config/constGroup/edit', function (req, res) {
    res.send(editConstGroup(req.body))
  })
  // #endregion

  // #region 常量
  app.post('/config/const/add', function (req, res) {
    res.send(addConst(req.body))
  })

  app.post('/config/const/list', async function (req, res) {
    const page = calcPageRowRange(req.body.pageSize, req.body.pageIndex)
    res.send(await getConstList(page, req.body.constGroupId))
  })

  app.post('/config/const/detail', async function (req, res) {
    res.send(await getConstDetail(req.body.id))
  })

  app.post('/config/const/delete', function (req, res) {
    const idList = JSON.parse(req.body.idList)
    res.send(deleteConst(idList))
  })

  app.post('/config/const/edit', function (req, res) {
    res.send(editConst(req.body))
  })
  // #endregion

  // #region 请求参数组
  app.post('/config/reqParamGroup/add', function (req, res) {
    res.send(addReqParamGroup(req.body))
  })

  app.post('/config/reqParamGroup/delete', function (req, res) {
    const idList = JSON.parse(req.body.idList)
    res.send(deleteReqParamGroup(idList))
  })

  app.post('/config/reqParamGroup/edit', function (req, res) {
    res.send(editReqParamGroup(req.body))
  })

  app.post('/config/reqParamGroup/list', async function (req, res) {
    const page = calcPageRowRange(req.body.pageSize, req.body.pageIndex)
    res.send(await getReqParamGroupList(page))
  })

  app.post('/config/reqParamGroup/detail', async function (req, res) {
    res.send(await getReqParamGroupDetail(req.body.id))
  })
  // #endregion

  // #region 请求参数
  app.post('/config/reqParam/add', function (req, res) {
    res.send(addReqParam(req.body))
  })

  app.post('/config/reqParam/delete', function (req, res) {
    const idList = JSON.parse(req.body.idList)
    res.send(deleteReqParam(idList))
  })

  app.post('/config/reqParam/edit', function (req, res) {
    res.send(editReqParamGroup(req.body))
  })

  app.post('/config/reqParam/list', async function (req, res) {
    const page = calcPageRowRange(req.body.pageSize, req.body.pageIndex)
    res.send(await getReqParamList(page, req.body.groupId))
  })

  app.post('/config/reqParam/detail', async function (req, res) {
    res.send(await getReqParamDetail(req.body.id))
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