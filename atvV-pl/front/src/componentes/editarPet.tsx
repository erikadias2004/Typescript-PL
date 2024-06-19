import React, { useState } from 'react';

type Pet = {
  id: number;
  nome: string;
  tutor: string;
  raca: string;
  genero: string;
  tipo: string;
};

type Props = {
  pet: Pet;
  setEditando: (value: boolean) => void;
};

const EditarPet: React.FC<Props> = ({ pet, setEditando }) => {
  const [nome, setNome] = useState<string>(pet.nome);
  const [tutor, setTutor] = useState<string>(pet.tutor);
  const [raca, setRaca] = useState<string>(pet.raca);
  const [genero, setGenero] = useState<string>(pet.genero);
  const [tipo, setTipo] = useState<string>(pet.tipo);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    switch (name) {
      case 'nome':
        setNome(value);
        break;
      case 'tutor':
        setTutor(value);
        break;
      case 'raca':
        setRaca(value);
        break;
      case 'genero':
        setGenero(value);
        break;
      case 'tipo':
        setTipo(value);
        break;
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const updatedPet = { nome, tutor, raca, genero, tipo };
    try {
      const response = await fetch(`http://localhost:5000/pets/${pet.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedPet),
      });
      if (!response.ok) {
        throw new Error('Erro ao atualizar pet');
      }
      alert('Pet atualizado com sucesso');
      window.location.reload(); // Recarrega a página após a atualização bem-sucedida
    } catch (error) {
      console.error('Erro ao atualizar pet:', error);
      alert('Erro ao atualizar pet');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card w-50 p-4">
        <h2 className="text-center mb-4">Editar Pet</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="nome" className="form-label">Nome</label>
            <input type="text" className="form-control" id="nome" name="nome" value={nome} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="tutor" className="form-label">Tutor</label>
            <input type="text" className="form-control" id="tutor" name="tutor" value={tutor} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="raca" className="form-label">Raça</label>
            <input type="text" className="form-control" id="raca" name="raca" value={raca} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="genero" className="form-label">Gênero</label>
            <input type="text" className="form-control" id="genero" name="genero" value={genero} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="tipo" className="form-label">Tipo</label>
            <input type="text" className="form-control" id="tipo" name="tipo" value={tipo} onChange={handleChange} />
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

export default EditarPet;
