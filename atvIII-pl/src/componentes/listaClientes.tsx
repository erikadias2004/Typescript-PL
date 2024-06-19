import React, { useState } from 'react';
import EditarCliente from './editarCliente';

type Cliente = {
    id: number,
    nome: string,
    nomeSocial: string,
    rgs: string[],
    telefones: string[],
    dataCadastro: string
};

const ListaCliente: React.FC = () => {
    const [clientes, setClientes] = useState<Cliente[]>(Array.from({ length: 10 }, (_, i) => ({
        id: i + 1,
        nome: `Cliente ${i + 1}`,
        nomeSocial: `Nome Social ${i + 1}`,
        rgs: [`RG${i + 1}-1`, `RG${i + 1}-2`],
        telefones: [`Telefone ${i + 1}-1`, `Telefone ${i + 1}-2`],
        dataCadastro: `2023-01-${i + 1 < 10 ? `0${i + 1}` : i + 1}`
    })));

    const [editando, setEditando] = useState<boolean>(false);
    const [clienteEditando, setClienteEditando] = useState<Cliente | null>(null);

    const handleDelete = (clienteId: number) => {
        setClientes(clientes.filter(c => c.id !== clienteId));
    };

    const handleEdit = (cliente: Cliente) => {
        setClienteEditando(cliente);
        setEditando(true);
    };

    if (editando && clienteEditando) {
        return <EditarCliente cliente={clienteEditando} setEditando={setEditando} />;
    }

    return (
        <div className="m-5">
            <h2 className="text-center">Clientes cadastrados</h2>
            <p className="text-center mb-5">Visualize abaixo todos os clientes cadastrados até o momento</p>
            {clientes.map((cliente, index) => (
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
                                <h5>{cliente.nome}</h5>
                            </button>
                        </h2>
                        <div
                            id={`flush-collapseOne${index}`}
                            className="accordion-collapse collapse"
                            data-bs-parent={`#accordionFlushExample${index}`}
                        >
                            <div className="accordion-body">
                                <div className="p-3">
                                    <p><strong>Nome: </strong>{cliente.nome}</p>
                                    <p><strong>Nome social: </strong>{cliente.nomeSocial}</p>
                                    <p><strong>RG: </strong>{cliente.rgs.join(', ')}</p>
                                    <p><strong>Telefone: </strong>{cliente.telefones.join(', ')}</p>
                                    <p><strong>Data de cadastro: </strong>{cliente.dataCadastro}</p>
                                    <button className="btn btn-primary me-2" onClick={() => handleEdit(cliente)}>Editar</button>
                                    <button className="btn btn-danger" onClick={() => handleDelete(cliente.id)}>Deletar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ListaCliente;
