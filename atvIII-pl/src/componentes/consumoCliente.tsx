import React, { useState } from 'react';

type Props = {
    cliente: { id: number, nome: string, cpf: string },
    setVerificandoConsumo: (value: boolean) => void
}

type Produto = {
    id: number,
    nome: string,
    quantidade: number,
    valorUnitario: number
};

type Servico = {
    id: number,
    nome: string,
    quantidade: number,
    valorUnitario: number
};

const ConsumoCliente: React.FC<Props> = ({ cliente, setVerificandoConsumo }) => {
    const [produtos] = useState<Produto[]>(Array.from({ length: 10 }, (_, i) => ({
        id: i + 1,
        nome: `Produto ${i + 1}`,
        quantidade: Math.floor(Math.random() * 10) + 1,
        valorUnitario: Math.floor(Math.random() * 100) + 1,
    })));

    const [servicos] = useState<Servico[]>(Array.from({ length: 10 }, (_, i) => ({
        id: i + 1,
        nome: `Serviço ${i + 1}`,
        quantidade: Math.floor(Math.random() * 10) + 1,
        valorUnitario: Math.floor(Math.random() * 100) + 1,
    })));

    const totalQuantidade = (items: { quantidade: number }[]) => {
        return items.reduce((acc, item) => acc + item.quantidade, 0);
    }

    const totalValor = (items: { quantidade: number, valorUnitario: number }[]) => {
        return items.reduce((acc, item) => acc + item.quantidade * item.valorUnitario, 0);
    }

    return (
        <div className="container mt-5">
            <h2 className="text-center">Consumo do Cliente {cliente.nome}</h2>
            <div className="row">
                <div className="col-md-6">
                    <h3 className="mt-5 text-center">Produtos</h3>
                    {produtos.map((produto) => (
                        <div className="card mb-3" key={produto.id}>
                            <div className="card-body">
                                <h5 className="card-title">{produto.nome}</h5>
                                <p className="card-text mb-0"><strong>Quantidade consumida:</strong> {produto.quantidade}</p>
                                <p className="card-text"><strong>Valor unitário:</strong> R${produto.valorUnitario}</p>
                            </div>
                        </div>
                    ))}
                    <div className="mt-3">
                        <h5><strong>Quantidade Total de Produtos:</strong> {totalQuantidade(produtos)}</h5>
                        <h5><strong>Valor Total dos Produtos:</strong> R${totalValor(produtos)}</h5>
                    </div>
                </div>
                <div className="col-md-6">
                    <h3 className="mt-5 text-center">Serviços</h3>
                    {servicos.map((servico) => (
                        <div className="card mb-3" key={servico.id}>
                            <div className="card-body">
                                <h5 className="card-title">{servico.nome}</h5>
                                <p className="card-text mb-0"><strong>Quantidade consumida:</strong> {servico.quantidade}</p>
                                <p className="card-text"><strong>Valor unitário:</strong> R${servico.valorUnitario}</p>
                            </div>
                        </div>
                    ))}
                    <div className="mt-3">
                        <h5><strong>Quantidade Total de Serviços:</strong> {totalQuantidade(servicos)}</h5>
                        <h5><strong>Valor Total dos Serviços:</strong> R${totalValor(servicos)}</h5>
                    </div>
                </div>
            </div>
            <div className="text-center mt-4">
                <button className="btn btn-secondary mb-5" onClick={() => setVerificandoConsumo(false)}>Voltar</button>
            </div>
        </div>
    );
};

export default ConsumoCliente;
