import React, { useEffect, useState } from 'react';
import EditarPet from './editarPet';

type Pet = {
  id: number;
  nome: string;
  tutor: string;
  raca: string;
  genero: string;
  tipo: string;
};

const ListaPet: React.FC = () => {
  const [pets, setPets] = useState<Pet[]>([]);
  const [editando, setEditando] = useState<boolean>(false);
  const [petEditando, setPetEditando] = useState<Pet | null>(null);

  const fetchPets = async () => {
    try {
      const response = await fetch('http://localhost:5000/pets');
      if (!response.ok) {
        throw new Error('Erro ao buscar pets');
      }
      const data = await response.json();
      console.log('Pets recebidos do backend:', data); // Log para verificar os dados recebidos
      setPets(data);
    } catch (error) {
      console.error('Erro ao buscar pets:', error);
      setPets([]);
    }
  };

  useEffect(() => {
    fetchPets();
  }, []);

  const handleDelete = async (petId: number) => {
    try {
      const response = await fetch(`http://localhost:5000/pets/${petId}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Erro ao deletar pet');
      }
      setPets(pets.filter((p) => p.id !== petId));
      alert('Pet deletado com sucesso');
    } catch (error:any) {
      console.error(error);
      alert(error.message || 'Erro ao deletar pet');
    }
  };

  const handleEdit = (pet: Pet) => {
    setPetEditando(pet);
    setEditando(true);
  };

  if (editando && petEditando) {
    return <EditarPet pet={petEditando} setEditando={setEditando} />;
  }

  return (
    <div className="m-5">
      <h2 className="text-center">Pets cadastrados</h2>
      <p className="text-center mb-5">Visualize abaixo todos os pets cadastrados até o momento</p>
      {pets.length === 0 ? (
        <p className="text-center">Nenhum pet cadastrado.</p>
      ) : (
        pets.map((pet, index) => (
          <div className={`accordion accordion-flush border`} id={`accordionFlushExample${index}`} key={index}>
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className={`accordion-button collapsed`}
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#flush-collapseOne${index}`}
                  aria-expanded="false"
                  aria-controls={`flush-collapseOne${index}`}
                >
                  <h5>{pet.nome}</h5>
                </button>
              </h2>
              <div
                id={`flush-collapseOne${index}`}
                className="accordion-collapse collapse"
                data-bs-parent={`#accordionFlushExample${index}`}
              >
                <div className="accordion-body">
                  <div className="p-3">
                    <p><strong>Tutor ID: </strong>{pet.tutor}</p>
                    <p><strong>Nome do pet: </strong>{pet.nome}</p>
                    <p><strong>Raça: </strong>{pet.raca}</p>
                    <p><strong>Gênero: </strong>{pet.genero}</p>
                    <p><strong>Tipo: </strong>{pet.tipo}</p>
                    <button className="btn btn-primary me-2" onClick={() => handleEdit(pet)}>Editar</button>
                    <button className="btn btn-danger" onClick={() => handleDelete(pet.id)}>Deletar</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ListaPet;

