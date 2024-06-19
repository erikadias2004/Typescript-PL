import React, { Component } from 'react';
import ConsumoCliente from './consumoCliente';

type State = {
    clientes: { id: number, nome: string, cpf: string }[],
    verificandoConsumo: boolean,
    clienteVerificando: { id: number, nome: string, cpf: string } | null,
    pesquisaCPF: string
}

export default class TabelaConsumo extends Component<{}, State> {
    constructor(props: {}) {
        super(props);
        this.state = {
            clientes: Array.from({ length: 10 }, (_, i) => ({
                id: i + 1,
                nome: `Cliente ${i + 1}`,
                cpf: `123.456.789-0${i}`
            })),
            verificandoConsumo: false,
            clienteVerificando: null,
            pesquisaCPF: ''
        };
    }

    handleVerificarConsumo(cliente: { id: number, nome: string, cpf: string }) {
        this.setState({
            clienteVerificando: cliente,
            verificandoConsumo: true
        });
    }

    handlePesquisaCPFChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ pesquisaCPF: event.target.value });
    }

    render() {
        const { clientes, verificandoConsumo, clienteVerificando, pesquisaCPF } = this.state;

        const clientesFiltrados = clientes.filter(cliente => cliente.cpf.includes(pesquisaCPF));

        if (verificandoConsumo && clienteVerificando) {
            return <ConsumoCliente cliente={clienteVerificando} setVerificandoConsumo={(value: boolean) => this.setState({ verificandoConsumo: value })} />;
        }

        return (
            <div className="m-5">
                <h2 className="text-center">Consumo por cliente</h2>
                <p className="text-center mb-5">Visualize abaixo todos os consumos por cliente até o momento</p>
                <div className="mb-4">
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Pesquisar por CPF" 
                        value={pesquisaCPF} 
                        onChange={this.handlePesquisaCPFChange} 
                    />
                </div>
                <table className="table table-striped text-center">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>CPF</th>
                            <th>Verificar Consumo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clientesFiltrados.map((cliente) => (
                            <tr key={cliente.id}>
                                <td>{cliente.id}</td>
                                <td>{cliente.nome}</td>
                                <td>{cliente.cpf}</td>
                                <td>
                                    <button className="btn btn-primary" onClick={() => this.handleVerificarConsumo(cliente)}>Visualizar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
}
