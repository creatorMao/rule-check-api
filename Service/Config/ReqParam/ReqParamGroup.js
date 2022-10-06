import { createGuid } from '../../../Helper/generatorHelper.js'
import { runSql, getRowsBySql } from '../../../Helper/dbHelper.js'
import { Ok } from '../../../Helper/returnHelper.js'

const addReqParamGroup = (groupInfo) => {
  let sql = `insert into REQ_PARAM_GROUP(ID,GROUP_FIELD,GROUP_NAME,REMARK,SORT)
              values($ID,$GROUP_FIELD,$GROUP_NAME,$REMARK,$SORT)
    `
  runSql(undefined, sql, {
    $ID: groupInfo["ID"] || createGuid(),
    $GROUP_FIELD: groupInfo["GROUP_FIELD"],
    $GROUP_NAME: groupInfo["GROUP_NAME"],
    $REMARK: groupInfo["REMARK"],
    $SORT: groupInfo["SORT"],
  });

  return Ok();
}

const deleteReqParamGroup = (idList) => {
  idList.forEach(id => {
    let sql = "delete from REQ_PARAM_GROUP where ID=$ID"
    runSql(undefined, sql, {
      $ID: id
    });
  });

  return Ok();
}

const editReqParamGroup = (groupInfo) => {
  let sql = "update REQ_PARAM_GROUP set GROUP_FIELD=$GROUP_FIELD,GROUP_NAME=$GROUP_NAME,REMARK=$REMARK where ID=$ID"
  runSql(undefined, sql, {
    $ID: groupInfo.ID,
    $GROUP_FIELD: groupInfo.GROUP_FIELD,
    $GROUP_NAME: groupInfo.GROUP_NAME,
    $REMARK: groupInfo.REMARK
  });

  return Ok();
}

const getReqParamGroupList = async ({ beginRow, pageSize }) => {
  let sql = `
    select t.*,row_count.ROWS_TOTAL from(
    select * from REQ_PARAM_GROUP order by sort asc nulls last, imp_time desc limit $beginRow,$pageSize
    ) t
    left join(
    select count(*) as ROWS_TOTAL from REQ_PARAM_GROUP
    ) row_count
    on 1=1
  `
  return Ok(undefined, await getRowsBySql(undefined, sql, {
    $beginRow: beginRow,
    $pageSize: pageSize
  }))
}

const getReqParamGroupDetail = async (id) => {
  let sql = `
   select * from REQ_PARAM_GROUP where id=$id
`
  return Ok(undefined, await getRowsBySql(undefined, sql, {
    $id: id
  }))
}

export {
  addReqParamGroup,
  deleteReqParamGroup,
  editReqParamGroup,
  getReqParamGroupList,
  getReqParamGroupDetail,
}