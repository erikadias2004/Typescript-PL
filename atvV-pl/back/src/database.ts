import mysql from 'mysql2/promise';

const createDatabaseAndTables = async () => {
  const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: 'fatec',
  };

  const connection = await mysql.createConnection(dbConfig);
  await connection.query('CREATE DATABASE IF NOT EXISTS PetShop');
  await connection.end();

  const dbConnection = await mysql.createConnection({
    ...dbConfig,
    database: 'PetShop',
  });

  await dbConnection.query(`
    CREATE TABLE IF NOT EXISTS Cliente (
      id INT AUTO_INCREMENT PRIMARY KEY,
      nome VARCHAR(255) NOT NULL,
      nome_social VARCHAR(255),
      cpf VARCHAR(11) NOT NULL UNIQUE,
      rg JSON,
      telefone JSON,
      data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await dbConnection.query(`
    CREATE TABLE IF NOT EXISTS Pet (
      id INT AUTO_INCREMENT PRIMARY KEY,
      tutor_id INT,
      nome_pet VARCHAR(255) NOT NULL,
      animal VARCHAR(255) NOT NULL,
      raca VARCHAR(255) NOT NULL,
      genero VARCHAR(50) NOT NULL,
      tipo VARCHAR(255) NOT NULL,
      FOREIGN KEY (tutor_id) REFERENCES Cliente(id)
    )
  `);

  await dbConnection.query(`
    CREATE TABLE IF NOT EXISTS Servico (
      id INT AUTO_INCREMENT PRIMARY KEY,
      nome VARCHAR(255) NOT NULL,
      valor DECIMAL(10, 2) NOT NULL
    )
  `);

  await dbConnection.query(`
    CREATE TABLE IF NOT EXISTS Produto (
      id INT AUTO_INCREMENT PRIMARY KEY,
      nome VARCHAR(255) NOT NULL,
      valor DECIMAL(10, 2) NOT NULL
    )
  `);

  await dbConnection.query(`
    CREATE TABLE IF NOT EXISTS Cliente_Servico (
      id INT AUTO_INCREMENT PRIMARY KEY,
      cliente_id INT,
      pet_id INT,
      servico_id INT,
      quantidade INT,
      valor_total DECIMAL(10, 2),
      animal VARCHAR(255),
      raca VARCHAR(255),
      tipo VARCHAR(255),
      FOREIGN KEY (cliente_id) REFERENCES Cliente(id),
      FOREIGN KEY (pet_id) REFERENCES Pet(id),
      FOREIGN KEY (servico_id) REFERENCES Servico(id)
    )
  `);

  await dbConnection.query(`
    CREATE TABLE IF NOT EXISTS Cliente_Produto (
      id INT AUTO_INCREMENT PRIMARY KEY,
      cliente_id INT,
      pet_id INT,
      produto_id INT,
      quantidade INT,
      valor_total DECIMAL(10, 2),
      animal VARCHAR(255),
      raca VARCHAR(255),
      tipo VARCHAR(255),
      FOREIGN KEY (cliente_id) REFERENCES Cliente(id),
      FOREIGN KEY (pet_id) REFERENCES Pet(id),
      FOREIGN KEY (produto_id) REFERENCES Produto(id)
    )
  `);

  await dbConnection.end();
  console.log('Database e tabelas criadas com sucesso!');
};

createDatabaseAndTables().catch(err => {
  console.error('Erro ao criar database e tabelas:', err);
});

export default createDatabaseAndTables;
