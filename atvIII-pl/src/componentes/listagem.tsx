import React from 'react';

const Listagem: React.FC = () => {
    const clientesValor = Array.from({ length: 5 }, (_, i) => `cliente ${i + 1}`);
    const clientesQuantidade = Array.from({ length: 10 }, (_, i) => `cliente ${i + 1}`);
    const produtos = Array.from({ length: 10 }, (_, i) => `produto ${i + 1}`);
    const servicos = Array.from({ length: 10 }, (_, i) => `servico ${i + 1}`);

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
                            <h5>Lista dos 5 clientes que mais consumiram produtos ou serviços por valor</h5>
                        </button>
                    </h2>
                    <div
                        id="flush-collapseOne"
                        className="accordion-collapse collapse"
                        data-bs-parent="#accordionFlushExample1"
                    >
                        <div className="accordion-body">
                            {clientesValor.map((cliente, index) => (
                                <div key={index}>
                                    <h5>{cliente}</h5>
                                    <p className="mb-0"><strong>CPF: </strong></p>
                                    <p><strong>Valor consumido: </strong></p>
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
                            <h5>Lista dos 10 clientes que mais consumiram produtos ou serviços por quantidade</h5>
                        </button>
                    </h2>
                    <div
                        id="flush-collapseTwo"
                        className="accordion-collapse collapse"
                        data-bs-parent="#accordionFlushExample2"
                    >
                        <div className="accordion-body">
                            {clientesQuantidade.map((cliente, index) => (
                                <div key={index}>
                                    <h5>{cliente}</h5>
                                    <p className="mb-0"><strong>CPF: </strong></p>
                                    <p><strong>Quantidade consumida: </strong></p>
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
                            <h5>Produtos mais consumidos</h5>
                        </button>
                    </h2>
                    <div
                        id="flush-collapseTres"
                        className="accordion-collapse collapse"
                        data-bs-parent="#accordionFlushExample3"
                    >
                        <div className="accordion-body">
                            {produtos.map((produto, index) => (
                                <div key={index}>
                                    <h5>{produto}</h5>
                                    <p><strong>Quantidade consumida: </strong></p>
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
                            <h5>Serviços mais consumidos</h5>
                        </button>
                    </h2>
                    <div
                        id="flush-collapseQuatro"
                        className="accordion-collapse collapse"
                        data-bs-parent="#accordionFlushExample4"
                    >
                        <div className="accordion-body">
                            {servicos.map((servico, index) => (
                                <div key={index}>
                                    <h5>{servico}</h5>
                                    <p><strong>Quantidade consumida: </strong></p>
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
