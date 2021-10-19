const mysql = require("mysql");

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

function inserirDados(conn) {
  const sql = "insert into aluno(nome, cpf) values ?";
  const values = [
    ["Vinicius Rodrigues", "12345678"],
    ["Davi Souza", "4567890"],
    ["Paloma Correa", "7974567"],
    ["Matheus Barros", "4567891"],
  ];
  conn.query(sql, [values], function (error, results, fields) {
    if (error) return console.log(error);
    console.log("Registro adicionados");
    conn.end();
  });
}

connection.connect((error) => {
  if (error) return console.log(error);
  console.log("Banco de dados conectado");
  criarTabela(connection);
  inserirDados(connection);
});
