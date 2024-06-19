import React, { useState } from 'react';

type Props = {
  cliente: { id: number, nome: string, nome_social: string, rgs: string[], telefones: string[], data_cadastro: string },
  setEditando: (value: boolean) => void
}

const EditarCliente: React.FC<Props> = ({ cliente, setEditando }) => {
  const [nome, setNome] = useState<string>(cliente.nome);
  const [nomeSocial, setNomeSocial] = useState<string>(cliente.nome_social);
  const [rgs, setRgs] = useState<string[]>([...cliente.rgs]);
  const [telefones, setTelefones] = useState<string[]>([...cliente.telefones]);

  const handleRGChange = (index: number, value: string) => {
    const newRgs = [...rgs];
    newRgs[index] = value;
    setRgs(newRgs);
  };

  const addRG = () => {
    setRgs([...rgs, '']);
  };

  const removeRG = (index: number) => {
    const newRgs = [...rgs];
    newRgs.splice(index, 1);
    setRgs(newRgs);
  };

  const handleTelefoneChange = (index: number, value: string) => {
    const newTelefones = [...telefones];
    newTelefones[index] = value;
    setTelefones(newTelefones);
  };

  const addTelefone = () => {
    setTelefones([...telefones, '']);
  };

  const removeTelefone = (index: number) => {
    const newTelefones = [...telefones];
    newTelefones.splice(index, 1);
    setTelefones(newTelefones);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const updatedCliente = { nome, nome_social: nomeSocial, rgs, telefones };
    console.log('Enviando dados atualizados:', updatedCliente);

    try {
      const response = await fetch(`http://localhost:5000/clientes/${cliente.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedCliente),
      });
      if (!response.ok) {
        throw new Error('Erro ao atualizar cliente');
      }
      alert('Cliente atualizado com sucesso');
      window.location.reload(); // Recarrega a página após a atualização bem-sucedida
    } catch (error) {
      console.error('Erro ao atualizar cliente:', error);
      alert('Erro ao atualizar cliente');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card w-50 p-4">
        <h2 className="text-center mb-4">Editar Cliente</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="nome" className="form-label">Nome</label>
            <input type="text" className="form-control" id="nome" value={nome} onChange={(e) => setNome(e.target.value)} />
          </div>
          <div className="mb-3">
            <label htmlFor="nomeSocial" className="form-label">Nome Social</label>
            <input type="text" className="form-control" id="nomeSocial" value={nomeSocial} onChange={(e) => setNomeSocial(e.target.value)} />
          </div>
          <div className="mb-3">
            <label htmlFor="rg0" className="form-label">RG</label>
            <input type="text" className="form-control" id="rg0" value={rgs[0]} onChange={(e) => handleRGChange(0, e.target.value)} />
          </div>
          {rgs.slice(1).map((rg, index) => (
            <div className="mb-3 d-flex" key={index + 1}>
              <input
                type="text"
                className="form-control me-2"
                value={rg}
                onChange={e => handleRGChange(index + 1, e.target.value)}
              />
              {rgs.length > 2 && (
                <button type="button" className="btn btn-danger" onClick={() => removeRG(index + 1)}>Remover</button>
              )}
            </div>
          ))}
          <button type="button" className="btn btn-primary mb-3" onClick={addRG}>Adicionar RG</button> <br />
          <label htmlFor="telefone" className="form-label">Telefone</label>
          {telefones.map((telefone, index) => (
            <div className="mb-3 d-flex" key={index}>
              <input
                type="text"
                className="form-control me-2"
                value={telefone}
                onChange={e => handleTelefoneChange(index, e.target.value)}
              />
              {telefones.length > 2 && (
                <button type="button" className="btn btn-danger" onClick={() => removeTelefone(index)}>Remover</button>
              )}
            </div>
          ))}
          <button type="button" className="btn btn-primary mb-3" onClick={addTelefone}>Adicionar Telefone</button>
          <div className="d-flex justify-content-end">
            <button type="button" className="btn btn-secondary me-2" onClick={() => setEditando(false)}>Voltar</button>
            <button type="submit" className="btn btn-success">Editar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditarCliente;
