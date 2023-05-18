/**
 * @author: zxj
 * @date:  2023-02-27 10:14
 * @tags:
 * 需要如下依赖
 * pnpm install sql.js
 * pnpm install @types/sql.js
 */
import initSqlJs from 'sql.js'
// import sqlWasm from "sql.js/dist/sql-wasm";


export const initSql = async () => {
  console.log(111)
  initSqlJs().then(async SqlJs => {
    const dataPromise = fetch('/db/demo.db').then(res => res.arrayBuffer());

    const [buf] = await Promise.all([dataPromise]);
    let db = new SqlJs.Database(new Uint8Array(buf))

    let insert = db.exec("insert into user values(null, 'lisi', 22)");
    console.log(insert)

    let statement = db.exec('select * from user', null);
    console.log(statement)
    console.log(dataPromise)
    console.log(SqlJs)
  });
}

export const getDatabase = () => {

}
