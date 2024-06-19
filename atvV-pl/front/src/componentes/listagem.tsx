import React, { useEffect, useState } from 'react';

const Listagem: React.FC = () => {
    const [clientesProdutoValor, setClientesProdutoValor] = useState<any[]>([]);
    const [clientesServicoValor, setClientesServicoValor] = useState<any[]>([]);
    const [clientesProdutoQuantidade, setClientesProdutoQuantidade] = useState<any[]>([]);
    const [clientesServicoQuantidade, setClientesServicoQuantidade] = useState<any[]>([]);
    const [produtosMaisConsumidos, setProdutosMaisConsumidos] = useState<any[]>([]);
    const [servicosMaisConsumidos, setServicosMaisConsumidos] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async (url: string, setState: React.Dispatch<React.SetStateAction<any[]>>) => {
            try {
                const response = await fetch(url);
                const data = await response.json();
                setState(data);
            } catch (error) {
                console.error('Erro ao buscar dados:', error);
            }
        };

        fetchData('http://localhost:5000/clientes/top-produto-valor', setClientesProdutoValor);
        fetchData('http://localhost:5000/clientes/top-servico-valor', setClientesServicoValor);
        fetchData('http://localhost:5000/clientes/top-produto-quantidade', setClientesProdutoQuantidade);
        fetchData('http://localhost:5000/clientes/top-servico-quantidade', setClientesServicoQuantidade);
        fetchData('http://localhost:5000/produtos-mais-consumidos', setProdutosMaisConsumidos);
        fetchData('http://localhost:5000/servicos-mais-consumidos', setServicosMaisConsumidos);
    }, []);

    return (
        <div className="m-5">
            <div className="accordion accordion-flush border" id="accordionFlushExample1">
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#flush-collapseOne"
                            aria-expanded="false"
                            aria-controls="flush-collapseOne"
                        >
                            <h5>Lista dos 5 clientes que mais consumiram produtos por valor</h5>
                        </button>
                    </h2>
                    <div
                        id="flush-collapseOne"
                        className="accordion-collapse collapse"
                        data-bs-parent="#accordionFlushExample1"
                    >
                        <div className="accordion-body">
                            {clientesProdutoValor.map((cliente, index) => (
                                <div key={index}>
                                    <p className='mb-0'><strong>Nome: </strong>{cliente.nome}</p>
                                    <p className="mb-0"><strong>CPF: </strong>{cliente.cpf}</p>
                                    <p><strong>Valor consumido: </strong>R${cliente.total_valor}</p>
                                    <hr />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="accordion accordion-flush border mt-3" id="accordionFlushExample2">
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#flush-collapseTwo"
                            aria-expanded="false"
                            aria-controls="flush-collapseTwo"
                        >
                            <h5>Lista dos 5 clientes que mais consumiram serviços por valor</h5>
                        </button>
                    </h2>
                    <div
                        id="flush-collapseTwo"
                        className="accordion-collapse collapse"
                        data-bs-parent="#accordionFlushExample2"
                    >
                        <div className="accordion-body">
                            {clientesServicoValor.map((cliente, index) => (
                                <div key={index}>
                                    <p className='mb-0'><strong>Nome: </strong>{cliente.nome}</p>
                                    <p className="mb-0"><strong>CPF: </strong>{cliente.cpf}</p>
                                    <p><strong>Valor consumido: </strong>R${cliente.total_valor}</p>
                                    <hr />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="accordion accordion-flush border mt-3" id="accordionFlushExample3">
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#flush-collapseTres"
                            aria-expanded="false"
                            aria-controls="flush-collapseTres"
                        >
                            <h5>Lista dos 10 clientes que mais consumiram produtos por quantidade</h5>
                        </button>
                    </h2>
                    <div
                        id="flush-collapseTres"
                        className="accordion-collapse collapse"
                        data-bs-parent="#accordionFlushExample3"
                    >
                        <div className="accordion-body">
                            {clientesProdutoQuantidade.map((cliente, index) => (
                                <div key={index}>
                                    <p className='mb-0'><strong>Nome: </strong>{cliente.nome}</p>
                                    <p className="mb-0"><strong>CPF: </strong>{cliente.cpf}</p>
                                    <p><strong>Quantidade consumida: </strong>{cliente.total_quantidade}</p>
                                    <hr />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="accordion accordion-flush border mt-3" id="accordionFlushExample4">
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#flush-collapseQuatro"
                            aria-expanded="false"
                            aria-controls="flush-collapseQuatro"
                        >
                            <h5>Lista dos 10 clientes que mais consumiram serviços por quantidade</h5>
                        </button>
                    </h2>
                    <div
                        id="flush-collapseQuatro"
                        className="accordion-collapse collapse"
                        data-bs-parent="#accordionFlushExample4"
                    >
                        <div className="accordion-body">
                            {clientesServicoQuantidade.map((cliente, index) => (
                                <div key={index}>
                                    <p className='mb-0'><strong>Nome: </strong>{cliente.nome}</p>
                                    <p className="mb-0"><strong>CPF: </strong>{cliente.cpf}</p>
                                    <p><strong>Quantidade consumida: </strong>{cliente.total_quantidade}</p>
                                    <hr />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="accordion accordion-flush border mt-3" id="accordionFlushExample5">
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#flush-collapseCinco"
                            aria-expanded="false"
                            aria-controls="flush-collapseCinco"
                        >
                            <h5>Produtos mais consumidos</h5>
                        </button>
                    </h2>
                    <div
                        id="flush-collapseCinco"
                        className="accordion-collapse collapse"
                        data-bs-parent="#accordionFlushExample5"
                    >
                        <div className="accordion-body">
                            {produtosMaisConsumidos.map((produto, index) => (
                                <div key={index}>
                                    <p className='mb-0'><strong>Nome: </strong>{produto.nome}</p>
                                    <p><strong>Quantidade consumida: </strong>{produto.total_quantidade}</p>
                                    <hr />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="accordion accordion-flush border mt-3" id="accordionFlushExample6">
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#flush-collapseSeis"
                            aria-expanded="false"
                            aria-controls="flush-collapseSeis"
                        >
                            <h5>Serviços mais consumidos</h5>
                        </button>
                    </h2>
                    <div
                        id="flush-collapseSeis"
                        className="accordion-collapse collapse"
                        data-bs-parent="#accordionFlushExample6"
                    >
                        <div className="accordion-body">
                            {servicosMaisConsumidos.map((servico, index) => (
                                <div key={index}>
                                    <p className='mb-0'><strong>Nome: </strong>{servico.nome}</p>
                                    <p><strong>Quantidade consumida: </strong>{servico.total_quantidade}</p>
                                    <hr />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Listagem;