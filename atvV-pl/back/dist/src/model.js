"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promise_1 = __importDefault(require("mysql2/promise"));
const createDatabaseAndTables = () => __awaiter(void 0, void 0, void 0, function* () {
    const dbConfig = {
        host: 'localhost',
        user: 'root',
        password: 'fatec',
    };
    const connection = yield promise_1.default.createConnection(dbConfig);
    yield connection.query('CREATE DATABASE IF NOT EXISTS PetShop');
    yield connection.end();
    const dbConnection = yield promise_1.default.createConnection(Object.assign(Object.assign({}, dbConfig), { database: 'PetShop' }));
    yield dbConnection.query(`
    CREATE TABLE IF NOT EXISTS Cliente (
      id INT AUTO_INCREMENT PRIMARY KEY,
      nome VARCHAR(255) NOT NULL,
      nome_social VARCHAR(255),
      cpf VARCHAR(11) NOT NULL,
      rg JSON,
      telefone JSON,
      data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
    yield dbConnection.query(`
    CREATE TABLE IF NOT EXISTS Pet (
      id INT AUTO_INCREMENT PRIMARY KEY,
      tutor_id INT,
      nome_pet VARCHAR(255) NOT NULL,
      raca VARCHAR(255) NOT NULL,
      genero VARCHAR(50) NOT NULL,
      tipo VARCHAR(255) NOT NULL,
      FOREIGN KEY (tutor_id) REFERENCES Cliente(id)
    )
  `);
    yield dbConnection.query(`
    CREATE TABLE IF NOT EXISTS Servico (
      id INT AUTO_INCREMENT PRIMARY KEY,
      nome VARCHAR(255) NOT NULL,
      valor DECIMAL(10, 2) NOT NULL
    )
  `);
    yield dbConnection.query(`
    CREATE TABLE IF NOT EXISTS Produto (
      id INT AUTO_INCREMENT PRIMARY KEY,
      nome VARCHAR(255) NOT NULL,
      valor DECIMAL(10, 2) NOT NULL
    )
  `);
    yield dbConnection.query(`
    CREATE TABLE IF NOT EXISTS Cliente_Servico (
      cliente_id INT,
      servico_id INT,
      PRIMARY KEY (cliente_id, servico_id),
      FOREIGN KEY (cliente_id) REFERENCES Cliente(id),
      FOREIGN KEY (servico_id) REFERENCES Servico(id)
    )
  `);
    yield dbConnection.query(`
    CREATE TABLE IF NOT EXISTS Cliente_Produto (
      cliente_id INT,
      produto_id INT,
      PRIMARY KEY (cliente_id, produto_id),
      FOREIGN KEY (cliente_id) REFERENCES Cliente(id),
      FOREIGN KEY (produto_id) REFERENCES Produto(id)
    )
  `);
    yield dbConnection.end();
    console.log('Database e tabelas criadas com sucesso!');
});
createDatabaseAndTables().catch(err => {
    console.error('Erro ao criar database e tabelas:', err);
});
