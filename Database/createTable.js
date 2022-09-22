const createTableSqlList = [
  {
    tableCode: 'CONST_GROUP',
    tableName: '常量组',
    sql: `
    CREATE TABLE CONST_GROUP
    (
      ID                VARCHAR(50)   PRIMARY KEY      NOT NULL,
      GROUP_NAME        VARCHAR(500),
      REMARK            TEXT,
      SORT              INT
    );
    `
  },
  {
    tableCode: 'CONST',
    tableName: '常量',
    sql: `
    CREATE TABLE CONST
    (
      ID                VARCHAR(50)   PRIMARY KEY      NOT NULL,
      CONST_GROUP_ID    VARCHAR(50),
      CONST_VALUE       VARCHAR(500),    
      CONST_NAME        VARCHAR(500),
      REMARK            TEXT,
      SORT              INT
    );
    `
  }
]


export {
  createTableSqlList
}