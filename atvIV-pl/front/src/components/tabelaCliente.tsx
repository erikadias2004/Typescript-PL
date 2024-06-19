import React, { useState, useEffect } from 'react';
import { IconContext } from 'react-icons';
import { FaEye, FaEdit, FaTrashAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

interface Cliente {
  id: string;
  nome: string;
  nomeSocial: string;
  email: string;
  endereco: {
    estado: string;
    cidade: string;
    bairro: string;
    rua: string;
    numero: string;
    codigoPostal: string;
    informacoesAdicionais: string;
  };
  telefones: { numero: string; ddd: string }[];
}

function TabelaCliente() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const response = await fetch("http://localhost:32831/cliente/clientes");
      const data = await response.json();
      setClientes(data);
    } catch (error) {
      console.error("Erro ao obter dados:", error);
    }
  }

  function handleRedirect() {
    navigate("/cadastrar");
  }

  async function handleDelete(id: string) {
    try {
      const response = await fetch(`http://localhost:32831/cliente/excluir`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (response.ok) {
        alert("Cliente excluído com sucesso.");
        fetchData(); // Atualiza a tabela após exclusão
      } else {
        alert("Ocorreu um erro ao excluir o cliente.");
      }
    } catch (error) {
      console.error("Erro ao excluir cliente:", error);
    }
  }

  function handleEditar(id: string) {
    navigate(`/editar/${id}`);
  }

  function handleVisualizar(id: string) {
    navigate(`/visualizar/${id}`);
  }

  return (
    <div className="m-5">
      <h1 className="my-4 text-center">Clientes</h1>
      <div className="table-responsive">
        <table className="table table-striped w-100">
          <thead className="thead-dark">
            <tr>
              <th className="text-center">ID</th>
              <th className="text-center">Nome</th>
              <th className="text-center">Nome Social</th>
              <th className="text-center">Email</th>
              <th className="text-center">Endereço</th>
              <th className="text-center">CEP</th>
              <th className="text-center">Telefones</th>
              <th className="text-center">Visualizar</th>
              <th className="text-center">Editar</th>
              <th className="text-center">Excluir</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((cliente) => (
              <tr key={cliente.id}>
                <td className="text-center">{cliente.id}</td>
                <td className="text-center">{cliente.nome}</td>
                <td className="text-center">{cliente.nomeSocial}</td>
                <td className="text-center">{cliente.email || "Não fornecido"}</td>
                <td className="text-center">
                  {`${cliente.endereco.rua}, ${cliente.endereco.numero}, ${cliente.endereco.bairro}, ${cliente.endereco.cidade}, ${cliente.endereco.estado}`}
                </td>
                <td className="text-center">{cliente.endereco.codigoPostal}</td>
                <td className="text-center">
                  {cliente.telefones.map((telefone, index) => (
                    <div key={index}>
                      {`(${telefone.ddd}) ${telefone.numero}`}
                    </div>
                  ))}
                </td>
                <td className="text-center">
                  <IconContext.Provider value={{ className: "text-primary" }}>
                    <FaEye style={{cursor: 'pointer'}} onClick={() => handleVisualizar(cliente.id)} />
                  </IconContext.Provider>
                </td>
                <td className="text-center">
                  <IconContext.Provider value={{ className: "text-warning" }}>
                    <FaEdit style={{cursor: 'pointer'}} onClick={() => handleEditar(cliente.id)} />
                  </IconContext.Provider>
                </td>
                <td className="text-center">
                  <IconContext.Provider value={{ className: "text-danger" }}>
                    <FaTrashAlt style={{cursor: 'pointer'}} onClick={() => handleDelete(cliente.id)} />
                  </IconContext.Provider>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="d-flex justify-content-center">
        <button className="btn btn-primary mt-3" onClick={handleRedirect}>
          Cadastrar Cliente
        </button>
      </div>
    </div>
  );
}

export default TabelaCliente;
