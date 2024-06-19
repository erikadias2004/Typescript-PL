import React, { Component } from 'react';
import EditarServico from './editarServico';

type Servico = {
    id: number,
    nome: string,
    valor: string
};

type State = {
    servicos: Servico[],
    editando: boolean,
    servicoEditando: Servico | null
};

export default class ListaServico extends Component<{}, State> {
    constructor(props: {}) {
        super(props);
        this.state = {
            servicos: Array.from({ length: 10 }, (_, i) => ({
                id: i + 1,
                nome: `Serviço ${i + 1}`,
                valor: `R$ ${(i + 1) * 15}`
            })),
            editando: false,
            servicoEditando: null
        };
    }

    handleDelete(servicoId: number) {
        this.setState({
            servicos: this.state.servicos.filter(s => s.id !== servicoId)
        });
    }

    handleEdit(servico: Servico) {
        this.setState({
            servicoEditando: servico,
            editando: true
        });
    }

    render() {
        const { servicos, editando, servicoEditando } = this.state;

        if (editando && servicoEditando) {
            return <EditarServico servico={servicoEditando} setEditando={(value: boolean) => this.setState({ editando: value })} />;
        }

        return (
            <div className="m-5">
                <h2 className="text-center">Serviços cadastrados</h2>
                <p className="text-center mb-5">Visualize abaixo todos os serviços cadastrados até o momento</p>
                {servicos.map((servico, index) => (
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
                                    <h5>{servico.nome}</h5>
                                </button>
                            </h2>
                            <div
                                id={`flush-collapseOne${index}`}
                                className="accordion-collapse collapse"
                                data-bs-parent={`#accordionFlushExample${index}`}
                            >
                                <div className="accordion-body">
                                    <div className="p-3">
                                        <p><strong>Nome: </strong>{servico.nome}</p>
                                        <p><strong>Valor: </strong>{servico.valor}</p>
                                        <button className="btn btn-primary me-2" onClick={() => this.handleEdit(servico)}>Editar</button>
                                        <button className="btn btn-danger" onClick={() => this.handleDelete(servico.id)}>Deletar</button>
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
