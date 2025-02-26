const mysql=require("mysql2/promise");

const connection = mysql.createPool({
  host: process.env.mysql_host,
  database: process.env.mysql_database,
  user: process.env.mysql_user,
  password: process.env.mysql_password,
  waitForConnections: true,
});

connection
  .getConnection()
  .then((connection) => {
    console.log("Database connected:",connection.threadId);
    connection.release();
  })
  .catch((error) => {
    console.error("Error acquiring connection:",error.message);
    console.log(error);
  });

module.exports = connection;