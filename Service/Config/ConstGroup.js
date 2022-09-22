import { createGuid } from '../../Helper/generatorHelper.js'
import { runSql, getRowsBySql } from '../../Helper/dbHelper.js'

const addConstGroup = (groupInfo) => {
  let sql = `insert into CONST_GROUP(ID,GROUP_NAME,REMARK,SORT)
              values($ID,$GROUP_NAME,$REMARK,$SORT)
    `
  groupInfo["ID"] = createGuid()
  runSql(undefined, sql, groupInfo);

  return {
    state: 'ok'
  }
}

const getConstGroupList = async () => {
  let sql = "select * from CONST_GROUP"
  return await getRowsBySql(undefined, sql)
}

export {
  addConstGroup,
  getConstGroupList
}