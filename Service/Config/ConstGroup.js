import { createGuid } from '../../Helper/generatorHelper.js'
import { runSql, getRowsBySql } from '../../Helper/dbHelper.js'
import { Ok } from '../../Helper/returnHelper.js'

const addConstGroup = (groupInfo) => {
  let sql = `insert into CONST_GROUP(ID,GROUP_NAME,REMARK,SORT)
              values($ID,$GROUP_NAME,$REMARK,$SORT)
    `
  groupInfo["ID"] = createGuid()
  runSql(undefined, sql, groupInfo);

  return Ok();
}

const getConstGroupList = async () => {
  let sql = "select * from CONST_GROUP order by imp_time desc"
  return await getRowsBySql(undefined, sql)
}

const deleteConstGroup = async (groupId) => {
  let sql = "delete from CONST_GROUP where ID=$ID"
  runSql(undefined, sql, {
    ID: groupId
  });

  return Ok();
}

export {
  addConstGroup,
  getConstGroupList,
  deleteConstGroup
}