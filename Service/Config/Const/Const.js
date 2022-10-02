import { createGuid } from '../../../Helper/generatorHelper.js'
import { runSql, getRowsBySql } from '../../../Helper/dbHelper.js'
import { Ok } from '../../../Helper/returnHelper.js'

const addConst = (constInfo) => {
  let sql = `insert into CONST(ID,CONST_GROUP_ID,CONST_VALUE,CONST_NAME,REMARK,SORT)
              values($ID,$CONST_GROUP_ID,$CONST_VALUE,$CONST_NAME,$REMARK,$SORT)
    `
  runSql(undefined, sql, {
    $ID: constInfo["ID"] || createGuid(),
    $CONST_GROUP_ID: constInfo["CONST_GROUP_ID"],
    $CONST_VALUE: constInfo["CONST_VALUE"],
    $CONST_NAME: constInfo["CONST_NAME"],
    $REMARK: constInfo["REMARK"],
    $SORT: constInfo["SORT"],
  });

  return Ok();
}

const getConstList = async ({ beginRow, pageSize }) => {
  let sql = `
    select t.*,row_count.ROWS_TOTAL from(
    select * from CONST order by sort asc nulls last, imp_time desc limit $beginRow,$pageSize
    ) t
    left join(
    select count(*) as ROWS_TOTAL from CONST
    ) row_count
    on 1=1
  `
  return Ok(undefined, await getRowsBySql(undefined, sql, {
    $beginRow: beginRow,
    $pageSize: pageSize
  }))
}

const getConstDetail = async (id) => {
  let sql = `
   select * from CONST where id=$id
`
  return Ok(undefined, await getRowsBySql(undefined, sql, {
    $id: id
  }))
}

const deleteConst = (idList) => {
  idList.forEach(id => {
    let sql = "delete from CONST where ID=$ID"
    runSql(undefined, sql, {
      $ID: id
    });
  });

  return Ok();
}

const editConst = (constInfo) => {
  let sql = "update CONST set CONST_VALUE=$CONST_VALUE,CONST_NAME=$CONST_NAME,REMARK=$REMARK where ID=$ID"
  runSql(undefined, sql, {
    $ID: constInfo.ID,
    $CONST_VALUE: constInfo.CONST_VALUE,
    $CONST_NAME: constInfo.CONST_NAME,
    $REMARK: constInfo.REMARK
  });

  return Ok();
}

export {
  addConst,
  getConstDetail,
  getConstList,
  deleteConst,
  editConst
}