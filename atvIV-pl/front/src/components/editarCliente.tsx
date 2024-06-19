import React, { useState, useEffect } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';

interface Endereco {
  estado: string;
  cidade: string;
  bairro: string;
  rua: string;
  numero: string;
  codigoPostal: string;
  informacoesAdicionais: string;
}

interface Cliente {
  nome: string;
  nomeSocial: string;
  email: string;
  endereco: Endereco;
  telefones: { numero: string; ddd: string }[];
}

const EditarCliente: React.FC = () => {
  const [cliente, setCliente] = useState<Cliente>({
    nome: '',
    nomeSocial: '',
    email: '',
    endereco: {
      estado: '',
      cidade: '',
      bairro: '',
      rua: '',
      numero: '',
      codigoPostal: '',
      informacoesAdicionais: '',
    },
    telefones: [{ numero: '', ddd: '' }],
  });

  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchCliente = async () => {
      try {
        const response = await fetch(`http://localhost:32831/cliente/${id}`);
        const data = await response.json();
        setCliente(data);
      } catch (error) {
        console.error("Erro ao buscar dados do cliente:", error);
      }
    };

    fetchCliente();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCliente((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEnderecoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCliente((prev) => ({
      ...prev,
      endereco: {
        ...prev.endereco,
        [name]: value,
      },
    }));
  };

  const handleTelefoneChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const { name, value } = e.target;
    const newTelefones = [...cliente.telefones];
    newTelefones[index] = { ...newTelefones[index], [name]: value };
    setCliente((prev) => ({
      ...prev,
      telefones: newTelefones,
    }));
  };

  const handleAddTelefone = () => {
    setCliente((prev) => ({
      ...prev,
      telefones: [...prev.telefones, { numero: '', ddd: '' }],
    }));
  };

  const handleRemoveTelefone = (index: number) => {
    if (cliente.telefones.length > 1) {
      const newTelefones = [...cliente.telefones];
      newTelefones.splice(index, 1);
      setCliente((prev) => ({
        ...prev,
        telefones: newTelefones,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:32831/cliente/atualizar", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cliente),
      });

      if (response.ok) {
        alert("Cliente atualizado com sucesso.");
        navigate("/");
      } else {
        alert("Erro ao atualizar cliente.");
      }
    } catch (error) {
      console.error("Erro ao atualizar cliente:", error);
    }
  };

  return (
    <div className="container mt-5">
      <button className="btn btn-link mb-3" onClick={() => navigate(-1)}>
        <FaArrowLeft /> Voltar
      </button>
      <h1 className="text-center">Editar Cliente</h1>
      <form onSubmit={handleSubmit}>
      <div className="form-group">
          <label>Nome</label>
          <input
            type="text"
            className="form-control"
            name="nome"
            value={cliente.nome}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Nome Social</label>
          <input
            type="text"
            className="form-control"
            name="nomeSocial"
            value={cliente.nomeSocial}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={cliente.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Estado</label>
          <input
            type="text"
            className="form-control"
            name="estado"
            value={cliente.endereco.estado}
            onChange={handleEnderecoChange}
          />
        </div>
        <div className="form-group">
          <label>Cidade</label>
          <input
            type="text"
            className="form-control"
            name="cidade"
            value={cliente.endereco.cidade}
            onChange={handleEnderecoChange}
          />
        </div>
        <div className="form-group">
          <label>Bairro</label>
          <input
            type="text"
            className="form-control"
            name="bairro"
            value={cliente.endereco.bairro}
            onChange={handleEnderecoChange}
          />
        </div>
        <div className="form-group">
          <label>Rua</label>
          <input
            type="text"
            className="form-control"
            name="rua"
            value={cliente.endereco.rua}
            onChange={handleEnderecoChange}
          />
        </div>
        <div className="form-group">
          <label>Número</label>
          <input
            type="text"
            className="form-control"
            name="numero"
            value={cliente.endereco.numero}
            onChange={handleEnderecoChange}
          />
        </div>
        <div className="form-group">
          <label>CEP</label>
          <input
            type="text"
            className="form-control"
            name="codigoPostal"
            value={cliente.endereco.codigoPostal}
            onChange={handleEnderecoChange}
          />
        </div>
        <div className="form-group">
          <label>Informações Adicionais</label>
          <input
            type="text"
            className="form-control"
            name="informacoesAdicionais"
            value={cliente.endereco.informacoesAdicionais}
            onChange={handleEnderecoChange}
          />
        </div>
        {cliente.telefones.map((telefone, index) => (
          <div key={index} className="form-group">
            <label>Telefone {index + 1}</label>
            <input
              type="text"
              className="form-control"
              name="numero"
              placeholder="Número"
              value={telefone.numero}
              onChange={(e) => handleTelefoneChange(e, index)}
            />
            <input
              type="text"
              className="form-control"
              name="ddd"
              placeholder="DDD"
              value={telefone.ddd}
              onChange={(e) => handleTelefoneChange(e, index)}
            />
            {cliente.telefones.length > 1 && (
              <button
                type="button"
                className="btn btn-danger mt-2"
                onClick={() => handleRemoveTelefone(index)}
              >
                Remover Telefone
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          className="btn btn-secondary mt-3"
          onClick={handleAddTelefone}
        >
          Adicionar Telefone
        </button>
        <div className="d-flex justify-content-center">
          <button type="submit" className="btn btn-primary m-5">Atualizar</button>
        </div>
      </form>
    </div>
  );
};

export default EditarCliente;
