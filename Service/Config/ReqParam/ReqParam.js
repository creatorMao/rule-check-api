import { createGuid } from '../../../Helper/generatorHelper.js'
import { runSql, getRowsBySql } from '../../../Helper/dbHelper.js'
import { Ok } from '../../../Helper/returnHelper.js'

const addReqParam = (info) => {
  let sql = `insert into REQ_PARAM(ID,GROUP_ID,PARAM_FIELD,PARAM_NAME,REMARK,SORT)
              values($ID,$GROUP_ID,$PARAM_FIELD,$PARAM_NAME,$REMARK,$SORT)
    `
  runSql(undefined, sql, {
    $ID: info["ID"] || createGuid(),
    $GROUP_ID: info["GROUP_ID"],
    $PARAM_FIELD: info["PARAM_FIELD"],
    $PARAM_NAME: info["PARAM_NAME"],
    $REMARK: info["REMARK"],
    $SORT: info["SORT"],
  });

  return Ok();
}

const deleteReqParam = (idList) => {
  idList.forEach(id => {
    let sql = "delete from REQ_PARAM where ID=$ID"
    runSql(undefined, sql, {
      $ID: id
    });
  });

  return Ok();
}

const editReqParam = (info) => {
  let sql = "update REQ_PARAM set PARAM_FIELD=$PARAM_FIELD,PARAM_NAME=$PARAM_NAME,REMARK=$REMARK where ID=$ID"
  runSql(undefined, sql, {
    $ID: info.ID,
    $PARAM_FIELD: info.PARAM_FIELD,
    $PARAM_NAME: info.PARAM_NAME,
    $REMARK: info.REMARK
  });

  return Ok();
}

const getReqParamList = async ({ beginRow, pageSize }) => {
  let sql = `
    select t.*,row_count.ROWS_TOTAL from(
    select * from REQ_PARAM  order by sort asc nulls last, imp_time desc limit $beginRow,$pageSize
    ) t
    left join(
    select count(*) as ROWS_TOTAL from REQ_PARAM 
    ) row_count
    on 1=1
  `
  return Ok(undefined, await getRowsBySql(undefined, sql, {
    $beginRow: beginRow,
    $pageSize: pageSize
  }))
}

const getReqParamDetail = async (id) => {
  let sql = `
   select * from REQ_PARAM where id=$id
`
  return Ok(undefined, await getRowsBySql(undefined, sql, {
    $id: id
  }))
}

export {
  addReqParam,
  deleteReqParam,
  editReqParam,
  getReqParamList,
  getReqParamDetail
}