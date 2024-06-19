import React, { Component } from 'react';

type Servico = {
    id: number,
    nome: string,
    valor: string
};

type Props = {
    servico: Servico,
    setEditando: (value: boolean) => void
};

type State = {
    nome: string,
    valor: string
};

export default class EditarServico extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            nome: props.servico.nome,
            valor: props.servico.valor
        };
    }

    handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            [event.target.name]: event.target.value
        } as Pick<State, keyof State>);
    }

    handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Implementar lógica de atualização do serviço aqui
        this.props.setEditando(false);
    }

    render() {
        const { setEditando } = this.props;
        const { nome, valor } = this.state;

        return (
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="card w-50 p-4">
                    <h2 className="text-center mb-4">Editar Serviço</h2>
                    <form onSubmit={this.handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="nome" className="form-label">Nome</label>
                            <input type="text" className="form-control" id="nome" name="nome" value={nome} onChange={this.handleChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="valor" className="form-label">Valor</label>
                            <input type="text" className="form-control" id="valor" name="valor" value={valor} onChange={this.handleChange} />
                        </div>
                        <div className="d-flex justify-content-end">
                            <button type="button" className="btn btn-secondary me-2" onClick={() => setEditando(false)}>Voltar</button>
                            <button type="submit" className="btn btn-success">Editar</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}
