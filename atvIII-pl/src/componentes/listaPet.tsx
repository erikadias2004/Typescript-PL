import React, { useState } from 'react';
import EditarPet from './editarPet';

type Pet = {
    id: number,
    nome: string,
    tutor: string,
    raca: string,
    genero: string,
    tipo: string
};

const ListaPet: React.FC = () => {
    const [pets, setPets] = useState<Pet[]>(Array.from({ length: 10 }, (_, i) => ({
        id: i + 1,
        nome: `Pet ${i + 1}`,
        tutor: `Tutor ${i + 1}`,
        raca: `Raça ${i + 1}`,
        genero: i % 2 === 0 ? 'Masculino' : 'Feminino',
        tipo: i % 3 === 0 ? 'Cachorro' : 'Gato'
    })));

    const [editando, setEditando] = useState<boolean>(false);
    const [petEditando, setPetEditando] = useState<Pet | null>(null);

    const handleDelete = (petId: number) => {
        setPets(pets.filter(p => p.id !== petId));
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
            {pets.map((pet, index) => (
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
                                    <p><strong>Tutor: </strong>{pet.tutor}</p>
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
            ))}
        </div>
    );
};

export default ListaPet;
