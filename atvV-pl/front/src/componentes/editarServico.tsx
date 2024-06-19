import React, { useState } from 'react';

type Servico = {
  id: number;
  nome: string;
  valor: string;
};

type Props = {
  servico: Servico;
  setEditando: (value: boolean) => void;
};

const EditarServico: React.FC<Props> = ({ servico, setEditando }) => {
  const [nome, setNome] = useState<string>(servico.nome);
  const [valor, setValor] = useState<string>(servico.valor);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "nome") {
      setNome(value);
    } else if (name === "valor") {
      setValor(value);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const updatedServico = { nome, valor };
    try {
      const response = await fetch(`http://localhost:5000/servicos/${servico.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedServico),
      });
      if (!response.ok) {
        throw new Error('Erro ao atualizar serviço');
      }
      alert('Serviço atualizado com sucesso');
      window.location.reload(); // Recarrega a página após a atualização bem-sucedida
    } catch (error) {
      console.error('Erro ao atualizar serviço:', error);
      alert('Erro ao atualizar serviço');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card w-50 p-4">
        <h2 className="text-center mb-4">Editar Serviço</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="nome" className="form-label">Nome</label>
            <input type="text" className="form-control" id="nome" name="nome" value={nome} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="valor" className="form-label">Valor</label>
            <input type="text" className="form-control" id="valor" name="valor" value={valor} onChange={handleChange} />
          </div>
          <div className="d-flex justify-content-end">
            <button type="button" className="btn btn-secondary me-2" onClick={() => setEditando(false)}>Voltar</button>
            <button type="submit" className="btn btn-success">Editar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditarServico;
