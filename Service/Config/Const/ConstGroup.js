import { createGuid } from '../../../Helper/generatorHelper.js'
import { runSql, getRowsBySql } from '../../../Helper/dbHelper.js'
import { Ok } from '../../../Helper/returnHelper.js'

const addConstGroup = (groupInfo) => {
  let sql = `insert into CONST_GROUP(ID,GROUP_NAME,REMARK,SORT)
              values($ID,$GROUP_NAME,$REMARK,$SORT)
    `
  runSql(undefined, sql, {
    $ID: groupInfo["ID"] || createGuid(),
    $GROUP_NAME: groupInfo["GROUP_NAME"],
    $REMARK: groupInfo["REMARK"],
    $SORT: groupInfo["SORT"],
  });

  return Ok();
}

const getConstGroupList = async ({ beginRow, pageSize }) => {
  let sql = `
    select t.*,row_count.ROWS_TOTAL from(
    select * from CONST_GROUP order by sort asc nulls last, imp_time desc limit $beginRow,$pageSize
    ) t
    left join(
    select count(*) as ROWS_TOTAL from CONST_GROUP
    ) row_count
    on 1=1
  `
  return Ok(undefined, await getRowsBySql(undefined, sql, {
    $beginRow: beginRow,
    $pageSize: pageSize
  }))
}

const getConstGroupDetail = async (id) => {
  let sql = `
   select * from CONST_GROUP where id=$id
`
  return Ok(undefined, await getRowsBySql(undefined, sql, {
    $id: id
  }))
}

const deleteConstGroup = (idList) => {
  idList.forEach(id => {
    let sql = "delete from CONST_GROUP where ID=$ID"
    runSql(undefined, sql, {
      $ID: id
    });
  });

  return Ok();
}

const editConstGroup = (groupInfo) => {
  let sql = "update CONST_GROUP set GROUP_NAME=$GROUP_NAME,REMARK=$REMARK where ID=$ID"
  runSql(undefined, sql, {
    $ID: groupInfo.ID,
    $GROUP_NAME: groupInfo.GROUP_NAME,
    $REMARK: groupInfo.REMARK
  });

  return Ok();
}

export {
  addConstGroup,
  getConstGroupDetail,
  getConstGroupList,
  deleteConstGroup,
  editConstGroup
}