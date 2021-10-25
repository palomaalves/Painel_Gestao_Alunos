const mysql = require("mysql");

// Cria conexão com o banco de dados MySQL
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "alunos",
});

// Criar tabela
function criarTabela(conn) {
  const sql =
    "create table if not exists aluno(" +
    "id integer primary key not null auto_increment," +
    "nome varchar(128) not null," +
    "cpf varchar(128) not null" +
    ");";

  conn.query(sql, function (error, results, fields) {
    if (error) return console.log(error);
    console.log("Tabela criada");
  });
}

connection.connect((error) => {
  if (error) return console.log(error);
  console.log("Banco de dados conectado");
  criarTabela(connection);
});
