import express from 'express';
import mysql from 'mysql2/promise';
import bodyParser from 'body-parser';
import cors from 'cors';
import createDatabaseAndTables from './database';

const app = express();
app.use(bodyParser.json());
app.use(cors());

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'fatec',
  database: 'PetShop',
};

// Função para criar conexão com o banco de dados
const getConnection = async () => {
  return await mysql.createConnection(dbConfig);
};

app.post('/cadastrar-cliente', async (req, res) => {
  const { nome, nome_social, cpf, rgs, telefones } = req.body;
  const data_cadastro = new Date();

  console.log('Recebendo dados do cliente:', req.body);

  try {
    const connection = await getConnection();
    console.log('Conexão com o banco de dados estabelecida');

    // Verificar se o CPF já existe
    const [existingClient] = await connection.execute<mysql.RowDataPacket[]>(
      'SELECT id FROM Cliente WHERE cpf = ?', [cpf]);

    if (existingClient.length > 0) {
      console.log('CPF já cadastrado');
      return res.status(409).json({ error: 'CPF já cadastrado' });
    }

    const [result] = await connection.execute<mysql.ResultSetHeader>(
      'INSERT INTO Cliente (nome, nome_social, cpf, rg, telefone, data_cadastro) VALUES (?, ?, ?, ?, ?, ?)',
      [nome, nome_social, cpf, JSON.stringify(rgs), JSON.stringify(telefones), data_cadastro]
    );

    console.log('Cliente inserido com sucesso:', result);

    await connection.end();
    console.log('Conexão com o banco de dados fechada');

    res.status(201).json({ id: result.insertId });
  } catch (error) {
    console.error('Erro ao cadastrar cliente:', error);
    res.status(500).json({ error: 'Erro ao cadastrar cliente' });
  }
});

// Adicione 'animal' aos campos do pet
app.post('/cadastrar-pet', async (req, res) => {
  const { cpf_tutor, nome_pet, animal, raca, genero, tipo } = req.body;

  try {
    const connection = await getConnection();

    const [tutor] = await connection.execute<mysql.RowDataPacket[]>(
      'SELECT id FROM Cliente WHERE cpf = ?', [cpf_tutor]
    );

    if (tutor.length === 0) {
      return res.status(404).json({ error: 'Tutor não encontrado' });
    }

    const tutor_id = tutor[0].id;

    await connection.execute(
      'INSERT INTO Pet (tutor_id, nome_pet, animal, raca, genero, tipo) VALUES (?, ?, ?, ?, ?, ?)',
      [tutor_id, nome_pet, animal, raca, genero, tipo]
    );

    await connection.end();
    res.status(201).json({ message: 'Pet cadastrado com sucesso' });
  } catch (error) {
    console.error('Erro ao cadastrar pet:', error);
    res.status(500).json({ error: 'Erro ao cadastrar pet' });
  }
});

app.post('/cadastrar-servico', async (req, res) => {
  const { nome, valor } = req.body;

  console.log('Recebendo dados do serviço:', req.body);

  try {
    const connection = await getConnection();
    console.log('Conexão com o banco de dados estabelecida');

    const [result] = await connection.execute<mysql.ResultSetHeader>(
      'INSERT INTO Servico (nome, valor) VALUES (?, ?)',
      [nome, valor]
    );

    console.log('Serviço inserido com sucesso:', result);

    await connection.end();
    console.log('Conexão com o banco de dados fechada');

    res.status(201).json({ id: result.insertId });
  } catch (error) {
    console.error('Erro ao cadastrar serviço:', error);
    res.status(500).json({ error: 'Erro ao cadastrar serviço' });
  }
});

app.post('/cadastrar-produto', async (req, res) => {
  const { nome, valor } = req.body;

  console.log('Recebendo dados do produto:', req.body);

  try {
    const connection = await getConnection();
    console.log('Conexão com o banco de dados estabelecida');

    const [result] = await connection.execute<mysql.ResultSetHeader>(
      'INSERT INTO Produto (nome, valor) VALUES (?, ?)',
      [nome, valor]
    );

    console.log('Produto inserido com sucesso:', result);

    await connection.end();
    console.log('Conexão com o banco de dados fechada');

    res.status(201).json({ id: result.insertId });
  } catch (error) {
    console.error('Erro ao cadastrar produto:', error);
    res.status(500).json({ error: 'Erro ao cadastrar produto' });
  }
});

// Endpoints para obter dados
app.delete('/clientes/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const connection = await getConnection();
    const [result] = await connection.execute<mysql.ResultSetHeader>('DELETE FROM Cliente WHERE id = ?', [id]);
    await connection.end();

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Cliente não encontrado' });
    }

    res.status(200).json({ message: 'Cliente deletado com sucesso' });
  } catch (error:any) {
    console.error('Erro ao deletar cliente:', error);
    if (error.code === 'ER_ROW_IS_REFERENCED_2') {
      res.status(409).json({ error: 'Cliente não pode ser deletado porque está referenciado em outra tabela' });
    } else {
      res.status(500).json({ error: 'Erro ao deletar cliente' });
    }
  }
});

app.delete('/pets/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const connection = await getConnection();
    const [result] = await connection.execute<mysql.ResultSetHeader>('DELETE FROM Pet WHERE id = ?', [id]);
    await connection.end();

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Pet não encontrado' });
    }

    res.status(200).json({ message: 'Pet deletado com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar pet:', error);
    res.status(500).json({ error: 'Erro ao deletar pet' });
  }
});

app.delete('/produtos/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const connection = await getConnection();
    const [result] = await connection.execute<mysql.ResultSetHeader>('DELETE FROM Produto WHERE id = ?', [id]);
    await connection.end();

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }

    res.status(200).json({ message: 'Produto deletado com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar produto:', error);
    res.status(500).json({ error: 'Erro ao deletar produto' });
  }
});

app.delete('/servicos/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const connection = await getConnection();
    const [result] = await connection.execute<mysql.ResultSetHeader>('DELETE FROM Servico WHERE id = ?', [id]);
    await connection.end();

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Serviço não encontrado' });
    }

    res.status(200).json({ message: 'Serviço deletado com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar serviço:', error);
    res.status(500).json({ error: 'Erro ao deletar serviço' });
  }
});

app.get('/clientes', async (req, res) => {
  try {
    const connection = await getConnection();
    const [results] = await connection.execute<any[]>(`
      SELECT id, nome, nome_social, cpf, rg, telefone, data_cadastro 
      FROM Cliente
    `);
    await connection.end();

    console.log('Resultados do banco de dados:', results);

    const clientes = results.map((cliente) => {
      let rgs = [];
      let telefones = [];
      try {
        rgs = typeof cliente.rg === 'string' ? JSON.parse(cliente.rg) : cliente.rg;
        telefones = typeof cliente.telefone === 'string' ? JSON.parse(cliente.telefone) : cliente.telefone;
      } catch (error) {
        console.error('Erro ao analisar JSON:', error);
      }
      return {
        ...cliente,
        rgs,
        telefones
      };
    });

    console.log('Clientes processados:', clientes);

    res.json(clientes);
  } catch (error) {
    console.error('Erro ao buscar clientes:', error);
    res.status(500).json({ error: 'Erro ao buscar clientes' });
  }
});

app.get('/clientes-tabela', async (req, res) => {
  try {
    const connection = await getConnection();
    const [clientes] = await connection.query('SELECT id, nome, cpf FROM Cliente');
    await connection.end();
    res.status(200).json({ clientes });
  } catch (error) {
    console.error('Erro ao buscar clientes:', error);
    res.status(500).json({ error: 'Erro ao buscar clientes' });
  }
});

app.get('/cliente/:clienteId/produtos', async (req, res) => {
  const { clienteId } = req.params;

  try {
    const connection = await getConnection();
    const [rows] = await connection.query(`
      SELECT p.id, p.nome, SUM(cp.quantidade) AS quantidade, p.valor AS valorUnitario, SUM(cp.valor_total) AS valorTotal
      FROM Cliente_Produto cp
      JOIN Produto p ON cp.produto_id = p.id
      WHERE cp.cliente_id = ?
      GROUP BY p.id, p.nome, p.valor
    `, [clienteId]);
    await connection.end();

    res.status(200).json({ produtos: rows });
  } catch (error) {
    console.error('Erro ao buscar produtos do cliente:', error);
    res.status(500).json({ error: 'Erro ao buscar produtos do cliente' });
  }
});

app.get('/cliente/:clienteId/servicos', async (req, res) => {
  const { clienteId } = req.params;

  try {
    const connection = await getConnection();
    const [rows] = await connection.query(`
      SELECT s.id, s.nome, SUM(cs.quantidade) AS quantidade, s.valor AS valorUnitario, SUM(cs.valor_total) AS valorTotal
      FROM Cliente_Servico cs
      JOIN Servico s ON cs.servico_id = s.id
      WHERE cs.cliente_id = ?
      GROUP BY s.id, s.nome, s.valor
    `, [clienteId]);
    await connection.end();

    res.status(200).json({ servicos: rows });
  } catch (error) {
    console.error('Erro ao buscar serviços do cliente:', error);
    res.status(500).json({ error: 'Erro ao buscar serviços do cliente' });
  }
});

app.get('/cliente/:id/produtos', async (req, res) => {
  const { id } = req.params;
  try {
    const connection = await getConnection();
    const [produtos] = await connection.query(
      'SELECT p.id, p.nome, cp.quantidade, p.valor as valorUnitario FROM Cliente_Produto cp JOIN Produto p ON cp.produto_id = p.id WHERE cp.cliente_id = ?',
      [id]
    );
    await connection.end();
    res.status(200).json({ produtos });
  } catch (error) {
    console.error('Erro ao buscar produtos do cliente:', error);
    res.status(500).json({ error: 'Erro ao buscar produtos do cliente' });
  }
});

app.get('/cliente/:id/servicos', async (req, res) => {
  const { id } = req.params;
  try {
    const connection = await getConnection();
    const [servicos] = await connection.query(
      'SELECT s.id, s.nome, cs.quantidade, s.valor as valorUnitario FROM Cliente_Servico cs JOIN Servico s ON cs.servico_id = s.id WHERE cs.cliente_id = ?',
      [id]
    );
    await connection.end();
    res.status(200).json({ servicos });
  } catch (error) {
    console.error('Erro ao buscar serviços do cliente:', error);
    res.status(500).json({ error: 'Erro ao buscar serviços do cliente' });
  }
});


app.get('/pets', async (req, res) => {
  try {
    const connection = await getConnection();
    const [results] = await connection.execute<any[]>(`
      SELECT id, nome_pet as nome, tutor_id as tutor, raca, genero, tipo
      FROM Pet
    `);
    await connection.end();

    res.json(results);
  } catch (error) {
    console.error('Erro ao buscar pets:', error);
    res.status(500).json({ error: 'Erro ao buscar pets' });
  }
});

app.put('/clientes/:id', async (req, res) => {
  const { id } = req.params;
  const { nome, nome_social, rgs, telefones } = req.body;

  console.log(`Atualizando cliente com ID: ${id}`);
  console.log('Dados recebidos:', req.body);

  try {
    const connection = await getConnection();
    const [result] = await connection.execute<mysql.ResultSetHeader>(
      'UPDATE Cliente SET nome = ?, nome_social = ?, rg = ?, telefone = ? WHERE id = ?',
      [nome, nome_social, JSON.stringify(rgs), JSON.stringify(telefones), id]
    );
    await connection.end();

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Cliente não encontrado' });
    }

    res.status(200).json({ message: 'Cliente atualizado com sucesso' });
  } catch (error) {
    console.error('Erro ao atualizar cliente:', error);
    res.status(500).json({ error: 'Erro ao atualizar cliente' });
  }
});



app.put('/pets/:id', async (req, res) => {
  const { id } = req.params;
  const { nome, tutor, raca, genero, tipo } = req.body;

  console.log(`Atualizando pet com ID: ${id}`);
  console.log('Dados recebidos:', req.body);

  try {
    const connection = await getConnection();
    const [result] = await connection.execute<mysql.ResultSetHeader>(
      'UPDATE Pet SET nome_pet = ?, tutor_id = ?, raca = ?, genero = ?, tipo = ? WHERE id = ?',
      [nome, tutor, raca, genero, tipo, id]
    );
    await connection.end();

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Pet não encontrado' });
    }

    res.status(200).json({ message: 'Pet atualizado com sucesso' });
  } catch (error) {
    console.error('Erro ao atualizar pet:', error);
    res.status(500).json({ error: 'Erro ao atualizar pet' });
  }
});


app.put('/produtos/:id', async (req, res) => {
  const { id } = req.params;
  const { nome, valor } = req.body;

  try {
    const connection = await getConnection();
    const [result] = await connection.execute<mysql.ResultSetHeader>(
      'UPDATE Produto SET nome = ?, valor = ? WHERE id = ?',
      [nome, valor, id]
    );
    await connection.end();

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }

    res.status(200).json({ message: 'Produto atualizado com sucesso' });
  } catch (error) {
    console.error('Erro ao atualizar produto:', error);
    res.status(500).json({ error: 'Erro ao atualizar produto' });
  }
});

app.put('/servicos/:id', async (req, res) => {
  const { id } = req.params;
  const { nome, valor } = req.body;

  try {
    const connection = await getConnection();
    const [result] = await connection.execute<mysql.ResultSetHeader>(
      'UPDATE Servico SET nome = ?, valor = ? WHERE id = ?',
      [nome, valor, id]
    );
    await connection.end();

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Serviço não encontrado' });
    }

    res.status(200).json({ message: 'Serviço atualizado com sucesso' });
  } catch (error) {
    console.error('Erro ao atualizar serviço:', error);
    res.status(500).json({ error: 'Erro ao atualizar serviço' });
  }
});

app.get('/clientes/cpf/:cpf', async (req, res) => {
  const { cpf } = req.params;

  try {
    const connection = await getConnection();
    const [clienteResult] = await connection.execute<mysql.RowDataPacket[]>(
      'SELECT id FROM Cliente WHERE cpf = ?',
      [cpf]
    );

    if (clienteResult.length === 0) {
      await connection.end();
      return res.status(404).json({ error: 'Cliente não encontrado' });
    }

    const clienteId = clienteResult[0].id;

    const [petsResult] = await connection.execute<mysql.RowDataPacket[]>(
      'SELECT id, nome_pet FROM Pet WHERE tutor_id = ?',
      [clienteId]
    );

    await connection.end();
    res.status(200).json({ id: clienteId, pets: petsResult });
  } catch (error) {
    console.error('Erro ao buscar cliente e pets:', error);
    res.status(500).json({ error: 'Erro ao buscar cliente e pets' });
  }
});



app.get('/produtos', async (req, res) => {
  try {
    const connection = await getConnection();
    const [rows] = await connection.execute<mysql.RowDataPacket[]>(
      'SELECT p.id, p.nome, p.valor, cp.animal, cp.raca, cp.tipo, SUM(cp.quantidade) AS quantidade FROM Produto p LEFT JOIN Cliente_Produto cp ON p.id = cp.produto_id GROUP BY p.id, p.nome, p.valor, cp.animal, cp.raca, cp.tipo'
    );
    await connection.end();
    res.json(rows);
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    res.status(500).json({ error: 'Erro ao buscar produtos' });
  }
});

app.get('/servicos', async (req, res) => {
  try {
    const connection = await getConnection();
    const [rows] = await connection.execute<mysql.RowDataPacket[]>(
      'SELECT s.id, s.nome, s.valor, cs.animal, cs.raca, cs.tipo, SUM(cs.quantidade) AS quantidade FROM Servico s LEFT JOIN Cliente_Servico cs ON s.id = cs.servico_id GROUP BY s.id, s.nome, s.valor, cs.animal, cs.raca, cs.tipo'
    );
    await connection.end();
    res.json(rows);
  } catch (error) {
    console.error('Erro ao buscar serviços:', error);
    res.status(500).json({ error: 'Erro ao buscar serviços' });
  }
});

// Rota para comprar produto
app.post('/comprar-produto', async (req, res) => {
  const { cliente_id, pet_id, produto_id, quantidade } = req.body;

  try {
    const connection = await getConnection();

    // Obter informações do pet
    const [petInfo] = await connection.query(
      'SELECT animal, raca, tipo FROM Pet WHERE id = ?',
      [pet_id]
    ) as any[];

    if (petInfo.length === 0) {
      return res.status(404).json({ error: 'Pet não encontrado' });
    }

    const { animal, raca, tipo } = petInfo[0];

    // Obter valor do produto
    const [produtoInfo] = await connection.query(
      'SELECT valor FROM Produto WHERE id = ?',
      [produto_id]
    ) as any[];

    if (produtoInfo.length === 0) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }

    const { valor: valor_produto } = produtoInfo[0];

    // Inserir uma nova entrada
    await connection.query(
      'INSERT INTO Cliente_Produto (cliente_id, pet_id, produto_id, quantidade, valor_total, animal, raca, tipo) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [cliente_id, pet_id, produto_id, quantidade, valor_produto, animal, raca, tipo]
    );

    await connection.end();
    res.status(200).json({ message: 'Produto comprado com sucesso' });
  } catch (error) {
    console.error('Erro ao comprar produto:', error);
    res.status(500).json({ error: 'Erro ao comprar produto' });
  }
});

app.post('/comprar-servico', async (req, res) => {
  const { cliente_id, pet_id, servico_id, quantidade } = req.body;

  try {
    const connection = await getConnection();

    // Obter informações do pet
    const [petInfo] = await connection.query(
      'SELECT animal, raca, tipo FROM Pet WHERE id = ?',
      [pet_id]
    ) as any[];

    if (petInfo.length === 0) {
      return res.status(404).json({ error: 'Pet não encontrado' });
    }

    const { animal, raca, tipo } = petInfo[0];

    // Obter valor do serviço
    const [servicoInfo] = await connection.query(
      'SELECT valor FROM Servico WHERE id = ?',
      [servico_id]
    ) as any[];

    if (servicoInfo.length === 0) {
      return res.status(404).json({ error: 'Serviço não encontrado' });
    }

    const { valor: valor_servico } = servicoInfo[0];

    // Inserir uma nova entrada
    await connection.query(
      'INSERT INTO Cliente_Servico (cliente_id, pet_id, servico_id, quantidade, valor_total, animal, raca, tipo) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [cliente_id, pet_id, servico_id, quantidade, valor_servico, animal, raca, tipo]
    );

    await connection.end();
    res.status(200).json({ message: 'Serviço comprado com sucesso' });
  } catch (error) {
    console.error('Erro ao comprar serviço:', error);
    res.status(500).json({ error: 'Erro ao comprar serviço' });
  }
});




app.get('/animais', async (req, res) => {
  try {
    const connection = await getConnection();
    const [rows] = await connection.execute<mysql.RowDataPacket[]>(
      'SELECT DISTINCT animal FROM Pet'
    );
    await connection.end();
    res.json(rows.map(row => row.animal));
  } catch (error) {
    console.error('Erro ao buscar animais:', error);
    res.status(500).json({ error: 'Erro ao buscar animais' });
  }
});

app.get('/racas', async (req, res) => {
  const { animal } = req.query;
  try {
    const connection = await getConnection();
    const [rows] = await connection.execute<mysql.RowDataPacket[]>(
      'SELECT DISTINCT raca FROM Pet WHERE animal = ?', [animal]
    );
    await connection.end();
    res.json(rows.map(row => row.raca));
  } catch (error) {
    console.error('Erro ao buscar raças:', error);
    res.status(500).json({ error: 'Erro ao buscar raças' });
  }
});

app.get('/tipos', async (req, res) => {
  const { raca } = req.query;
  try {
    const connection = await getConnection();
    const [rows] = await connection.execute<mysql.RowDataPacket[]>(
      'SELECT DISTINCT tipo FROM Pet WHERE raca = ?', [raca]
    );
    await connection.end();
    res.json(rows.map(row => row.tipo));
  } catch (error) {
    console.error('Erro ao buscar tipos:', error);
    res.status(500).json({ error: 'Erro ao buscar tipos' });
  }
});

// Lista dos 5 clientes que mais consumiram produtos por valor
app.get('/clientes/top-produto-valor', async (req, res) => {
  try {
    const connection = await getConnection();
    const [rows] = await connection.query(
      `SELECT c.nome, c.cpf, SUM(cp.valor_total) AS total_valor
      FROM Cliente_Produto cp
      JOIN Cliente c ON cp.cliente_id = c.id
      GROUP BY cp.cliente_id
      ORDER BY total_valor DESC
      LIMIT 5`
    );
    await connection.end();
    res.json(rows);
  } catch (error) {
    console.error('Erro ao buscar clientes:', error);
    res.status(500).json({ error: 'Erro ao buscar clientes' });
  }
});

// Lista dos 5 clientes que mais consumiram serviços por valor
app.get('/clientes/top-servico-valor', async (req, res) => {
  try {
    const connection = await getConnection();
    const [rows] = await connection.query(
      `SELECT c.nome, c.cpf, SUM(cs.valor_total) AS total_valor
      FROM Cliente_Servico cs
      JOIN Cliente c ON cs.cliente_id = c.id
      GROUP BY cs.cliente_id
      ORDER BY total_valor DESC
      LIMIT 5`
    );
    await connection.end();
    res.json(rows);
  } catch (error) {
    console.error('Erro ao buscar clientes:', error);
    res.status(500).json({ error: 'Erro ao buscar clientes' });
  }
});

// Lista dos 10 clientes que mais consumiram produtos por quantidade
app.get('/clientes/top-produto-quantidade', async (req, res) => {
  try {
    const connection = await getConnection();
    const [rows] = await connection.query(
      `SELECT c.nome, c.cpf, SUM(cp.quantidade) AS total_quantidade
      FROM Cliente_Produto cp
      JOIN Cliente c ON cp.cliente_id = c.id
      GROUP BY cp.cliente_id
      ORDER BY total_quantidade DESC
      LIMIT 10`
    );
    await connection.end();
    res.json(rows);
  } catch (error) {
    console.error('Erro ao buscar clientes:', error);
    res.status(500).json({ error: 'Erro ao buscar clientes' });
  }
});

// Lista dos 10 clientes que mais consumiram serviços por quantidade
app.get('/clientes/top-servico-quantidade', async (req, res) => {
  try {
    const connection = await getConnection();
    const [rows] = await connection.query(
      `SELECT c.nome, c.cpf, SUM(cs.quantidade) AS total_quantidade
      FROM Cliente_Servico cs
      JOIN Cliente c ON cs.cliente_id = c.id
      GROUP BY cs.cliente_id
      ORDER BY total_quantidade DESC
      LIMIT 10`
    );
    await connection.end();
    res.json(rows);
  } catch (error) {
    console.error('Erro ao buscar clientes:', error);
    res.status(500).json({ error: 'Erro ao buscar clientes' });
  }
});

// Produtos mais consumidos
app.get('/produtos-mais-consumidos', async (req, res) => {
  try {
    const connection = await getConnection();
    const [rows] = await connection.query(
      `SELECT p.nome, SUM(cp.quantidade) AS total_quantidade
      FROM Cliente_Produto cp
      JOIN Produto p ON cp.produto_id = p.id
      GROUP BY p.id
      ORDER BY total_quantidade DESC`
    );
    await connection.end();
    res.json(rows);
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    res.status(500).json({ error: 'Erro ao buscar produtos' });
  }
});

// Serviços mais consumidos
app.get('/servicos-mais-consumidos', async (req, res) => {
  try {
    const connection = await getConnection();
    const [rows] = await connection.query(
      `SELECT s.nome, SUM(cs.quantidade) AS total_quantidade
      FROM Cliente_Servico cs
      JOIN Servico s ON cs.servico_id = s.id
      GROUP BY s.id
      ORDER BY total_quantidade DESC`
    );
    await connection.end();
    res.json(rows);
  } catch (error) {
    console.error('Erro ao buscar serviços:', error);
    res.status(500).json({ error: 'Erro ao buscar serviços' });
  }
});





// Chame a função de criação do banco de dados e tabelas
createDatabaseAndTables()
  .then(() => {
    app.listen(5000, () => {
      console.log('Server is running on port 5000');
    });
  })
  .catch(err => {
    console.error('Erro ao criar database e tabelas:', err);
  });
