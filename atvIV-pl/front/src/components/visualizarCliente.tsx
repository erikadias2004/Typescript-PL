import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaArrowLeft } from 'react-icons/fa';

interface Endereco {
  id: number;
  estado: string;
  cidade: string;
  bairro: string;
  rua: string;
  numero: string;
  codigoPostal: string;
  informacoesAdicionais: string;
}

interface Telefone {
  id: number;
  numero: string;
  ddd: string;
}

interface Cliente {
  id: number;
  nome: string;
  nomeSocial: string;
  email: string | null;
  endereco: Endereco;
  telefones: Telefone[];
}

const VisualizarCliente: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [cliente, setCliente] = useState<Cliente | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:32831/cliente/${id}`)
        .then(response => response.json())
        .then(data => setCliente(data))
        .catch(error => console.error('Erro ao buscar cliente:', error));
    }
  }, [id]);

  if (!cliente) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="container mt-5">
      <button className="btn btn-link mb-3" onClick={() => navigate(-1)}>
        <FaArrowLeft /> Voltar
      </button>
      <h1 className="mb-4">Detalhes do Cliente</h1>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Nome: {cliente.nome}</h5>
          <h6 className="card-subtitle mb-2 text-muted">Nome Social: {cliente.nomeSocial}</h6>
          <p className="card-text">Email: {cliente.email || 'Não fornecido'}</p>
          <h6>Endereço:</h6>
          <ul>
            <li>Estado: {cliente.endereco.estado}</li>
            <li>Cidade: {cliente.endereco.cidade}</li>
            <li>Bairro: {cliente.endereco.bairro}</li>
            <li>Rua: {cliente.endereco.rua}, {cliente.endereco.numero}</li>
            <li>CEP: {cliente.endereco.codigoPostal}</li>
            <li>Informações Adicionais: {cliente.endereco.informacoesAdicionais}</li>
          </ul>
          <h6>Telefones:</h6>
          <ul>
            {cliente.telefones.map(telefone => (
              <li key={telefone.id}>
                ({telefone.ddd}) {telefone.numero}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default VisualizarCliente;
