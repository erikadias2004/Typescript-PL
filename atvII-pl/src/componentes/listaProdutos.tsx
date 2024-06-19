import React, { Component } from 'react';
import EditarProduto from './editarProduto';

type Produto = {
    id: number,
    nome: string,
    valor: string
};

type State = {
    produtos: Produto[],
    editando: boolean,
    produtoEditando: Produto | null
};

export default class ListaProduto extends Component<{}, State> {
    constructor(props: {}) {
        super(props);
        this.state = {
            produtos: Array.from({ length: 10 }, (_, i) => ({
                id: i + 1,
                nome: `Produto ${i + 1}`,
                valor: `R$ ${(i + 1) * 10}`
            })),
            editando: false,
            produtoEditando: null
        };
    }

    handleDelete(produtoId: number) {
        this.setState({
            produtos: this.state.produtos.filter(p => p.id !== produtoId)
        });
    }

    handleEdit(produto: Produto) {
        this.setState({
            produtoEditando: produto,
            editando: true
        });
    }

    render() {
        const { produtos, editando, produtoEditando } = this.state;

        if (editando && produtoEditando) {
            return <EditarProduto produto={produtoEditando} setEditando={(value: boolean) => this.setState({ editando: value })} />;
        }

        return (
            <div className="m-5">
                <h2 className="text-center">Produtos cadastrados</h2>
                <p className="text-center mb-5">Visualize abaixo todos os produtos cadastrados até o momento</p>
                {produtos.map((produto, index) => (
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
                                    <h5>{produto.nome}</h5>
                                </button>
                            </h2>
                            <div
                                id={`flush-collapseOne${index}`}
                                className="accordion-collapse collapse"
                                data-bs-parent={`#accordionFlushExample${index}`}
                            >
                                <div className="accordion-body">
                                    <div className="p-3">
                                        <p><strong>Nome: </strong>{produto.nome}</p>
                                        <p><strong>Valor: </strong>{produto.valor}</p>
                                        <button className="btn btn-primary me-2" onClick={() => this.handleEdit(produto)}>Editar</button>
                                        <button className="btn btn-danger" onClick={() => this.handleDelete(produto.id)}>Deletar</button>
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
