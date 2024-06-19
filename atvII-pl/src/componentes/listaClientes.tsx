import React, { Component } from 'react';
import EditarCliente from './editarCliente';

type State = {
    clientes: { id: number, nome: string, nomeSocial: string, rgs: string[], telefones: string[], dataCadastro: string }[],
    editando: boolean,
    clienteEditando: { id: number, nome: string, nomeSocial: string, rgs: string[], telefones: string[], dataCadastro: string } | null
}

export default class ListaCliente extends Component<{}, State> {
    constructor(props: {}) {
        super(props);
        this.state = {
            clientes: Array.from({ length: 10 }, (_, i) => ({
                id: i + 1,
                nome: `Cliente ${i + 1}`,
                nomeSocial: `Nome Social ${i + 1}`,
                rgs: [`RG${i + 1}-1`, `RG${i + 1}-2`],
                telefones: [`Telefone ${i + 1}-1`, `Telefone ${i + 1}-2`],
                dataCadastro: `2023-01-${i + 1 < 10 ? `0${i + 1}` : i + 1}`
            })),
            editando: false,
            clienteEditando: null
        };
    }

    handleDelete(clienteId: number) {
        this.setState({
            clientes: this.state.clientes.filter(c => c.id !== clienteId)
        });
    }

    handleEdit(cliente: { id: number, nome: string, nomeSocial: string, rgs: string[], telefones: string[], dataCadastro: string }) {
        this.setState({
            clienteEditando: cliente,
            editando: true
        });
    }

    render() {
        const { clientes, editando, clienteEditando } = this.state;

        if (editando && clienteEditando) {
            return <EditarCliente cliente={clienteEditando} setEditando={(value: boolean) => this.setState({ editando: value })} />;
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
                                        <button className="btn btn-primary me-2" onClick={() => this.handleEdit(cliente)}>Editar</button>
                                        <button className="btn btn-danger" onClick={() => this.handleDelete(cliente.id)}>Deletar</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }
}
