import sqlite3 from 'sqlite3'

let currentDb = null;

const connectDb = (dbFilePath) => {
  currentDb = new sqlite3.Database(dbFilePath, err => {
  })
  return currentDb;
}

const createTable = async (db, tableCode, tableName, createTableSql) => {
  const existFlag = await checkTableExist(db, tableCode);
  let tableText = `表【${tableName}:${tableCode}】`
  if (!existFlag) {
    db.run(createTableSql);
    console.log(`${tableText}创建成功`);
  }
  else {
    console.log(`${tableText}已存在，将跳过`);
  }
}

const checkTableExist = async (db, tableName) => {
  const sql = `SELECT count(*) AS COUNT FROM sqlite_master WHERE type = 'table' and tbl_name = '${tableName}'`
  const rows = await getRowsBySql(db, sql);
  return rows[0]["COUNT"] != '0'
}

const getRowsBySql = (db = currentDb, sql) => {
  return new Promise((resolve, reject) => {
    db.all(sql, function (err, rows) {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

const runSql = (db = currentDb, sql, param = {}) => {
  Object.keys(param).forEach(key => {
    param[`$${key}`] = param[key]
    delete param[key]
  })
  db.run(sql, param);
}

export {
  connectDb,
  createTable,
  runSql,
  getRowsBySql
} 