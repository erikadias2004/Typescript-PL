import React, { Component } from 'react';

type Pet = {
    id: number,
    nome: string,
    tutor: string,
    raca: string,
    genero: string,
    tipo: string
};

type Props = {
    pet: Pet,
    setEditando: (value: boolean) => void
};

type State = {
    nome: string,
    tutor: string,
    raca: string,
    genero: string,
    tipo: string
};

export default class EditarPet extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            nome: props.pet.nome,
            tutor: props.pet.tutor,
            raca: props.pet.raca,
            genero: props.pet.genero,
            tipo: props.pet.tipo
        };
    }

    handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            [event.target.name]: event.target.value
        } as Pick<State, keyof State>);
    }

    handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Implementar lógica de atualização do pet aqui
        this.props.setEditando(false);
    }

    render() {
        const { setEditando } = this.props;
        const { nome, tutor, raca, genero, tipo } = this.state;

        return (
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="card w-50 p-4">
                    <h2 className="text-center mb-4">Editar Pet</h2>
                    <form onSubmit={this.handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="nome" className="form-label">Nome</label>
                            <input type="text" className="form-control" id="nome" name="nome" value={nome} onChange={this.handleChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="tutor" className="form-label">Tutor</label>
                            <input type="text" className="form-control" id="tutor" name="tutor" value={tutor} onChange={this.handleChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="raca" className="form-label">Raça</label>
                            <input type="text" className="form-control" id="raca" name="raca" value={raca} onChange={this.handleChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="genero" className="form-label">Gênero</label>
                            <input type="text" className="form-control" id="genero" name="genero" value={genero} onChange={this.handleChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="tipo" className="form-label">Tipo</label>
                            <input type="text" className="form-control" id="tipo" name="tipo" value={tipo} onChange={this.handleChange} />
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
