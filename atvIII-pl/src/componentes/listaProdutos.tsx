import React, { useState } from 'react';
import EditarProduto from './editarProduto';

type Produto = {
    id: number,
    nome: string,
    valor: string
};

const ListaProduto: React.FC = () => {
    const [produtos, setProdutos] = useState<Produto[]>(Array.from({ length: 10 }, (_, i) => ({
        id: i + 1,
        nome: `Produto ${i + 1}`,
        valor: `R$ ${(i + 1) * 10}`
    })));

    const [editando, setEditando] = useState<boolean>(false);
    const [produtoEditando, setProdutoEditando] = useState<Produto | null>(null);

    const handleDelete = (produtoId: number) => {
        setProdutos(produtos.filter(p => p.id !== produtoId));
    };

    const handleEdit = (produto: Produto) => {
        setProdutoEditando(produto);
        setEditando(true);
    };

    if (editando && produtoEditando) {
        return <EditarProduto produto={produtoEditando} setEditando={setEditando} />;
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
                                    <button className="btn btn-primary me-2" onClick={() => handleEdit(produto)}>Editar</button>
                                    <button className="btn btn-danger" onClick={() => handleDelete(produto.id)}>Deletar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ListaProduto;
