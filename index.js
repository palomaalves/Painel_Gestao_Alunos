// importa a biblioteca 'path' para obter o caminho absoluto da aplicação
var path = require("path");


// importa a biblioteca do framework express
// http://expressjs.com/pt-br/api.html
const express = require("express");
// cria uma instância do express
const app = express();
// definição da porta onde o servidor web será criado/acessado
const port = 3000;


// importa a bilioteca para conexão com o banco de dados mysql
const mysql = require("mysql");

// habilita o express para fazer o parse de json em requisições post
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// configura o acesso aos arquivos estáticos na pasta 'public'
app.use(express.static("./public"));

// cria um roteador para receber as rotas da aplicação
const router = express.Router();

// define a rota para a raiz do servidor - /GET localhost:3000/ e server o arquivo 'form.html'
router.get("/", (req, res) => res.sendFile(path.resolve("./public/form.html")));

// cria a rota para retornar todos os alunos - /GET localhost:3000/alunos
router.get("/alunos", (req, res) => {
  exConsultaSQL("SELECT * FROM aluno", res);
});

// cria a rota para retornar um aluno pelo ID
router.post("/view", (req, res) => {
  let filter = "";
  if (req.body.id) filter = " WHERE ID=" + parseInt(req.body.id);
  exConsultaSQL("SELECT * FROM aluno" + filter, res);
});

// cria a rota para excluir um aluno pelo ID
router.post("/delete", (req, res) => {
  exConsultaSQL("DELETE FROM aluno WHERE ID=" + parseInt(req.body.id), res);
});

// cria a rota para inserir um novo aluno
router.post("/add", (req, res) => {
  const nome = req.body.nome.substring(0, 150);
  const cpf = req.body.cpf.substring(0, 11);
  exConsultaSQL(`INSERT INTO aluno(Nome, CPF) VALUES('${nome}','${cpf}')`, res);
});

// cria a rota para atualizar o registro de um aluno pelo ID
router.post("/update", (req, res) => {
  const id = parseInt(req.body.id);
  const nome = req.body.nome.substring(0, 150);
  const cpf = req.body.cpf.substring(0, 11);
  exConsultaSQL(
    `UPDATE aluno SET Nome='${nome}', CPF='${cpf}' WHERE ID=${id}`,
    res
  );
});

// habilita a rota criada acima na instância do express
app.use("/", router);

// inicia o webserver na porta escolhida
app.listen(port, () => {
  console.log(`Servidor iniciado em localhost:${port}`);
});

function exConsultaSQL(sqlQry, res) {
  const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "alunos",
  });

  connection.query(sqlQry, function (error, results, fields) {
    if (error) res.json(error);
    else res.json(results);

    connection.end();
    console.log(`Query: '${sqlQry}' realizada `);
  });
}
