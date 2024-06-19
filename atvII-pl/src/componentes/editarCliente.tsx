import React, { Component } from 'react';

type Props = {
    cliente: { id: number, nome: string, nomeSocial: string, rgs: string[], telefones: string[], dataCadastro: string },
    setEditando: (value: boolean) => void
}

type State = {
    rgs: string[],
    telefones: string[]
}

class EditarCliente extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            rgs: [...props.cliente.rgs],
            telefones: [...props.cliente.telefones]
        };
    }

    handleRGChange(index: number, value: string) {
        const rgs = [...this.state.rgs];
        rgs[index] = value;
        this.setState({ rgs });
    }

    addRG() {
        this.setState({ rgs: [...this.state.rgs, ''] });
    }

    removeRG(index: number) {
        const rgs = [...this.state.rgs];
        rgs.splice(index, 1);
        this.setState({ rgs });
    }

    handleTelefoneChange(index: number, value: string) {
        const telefones = [...this.state.telefones];
        telefones[index] = value;
        this.setState({ telefones });
    }

    addTelefone() {
        this.setState({ telefones: [...this.state.telefones, ''] });
    }

    removeTelefone(index: number) {
        const telefones = [...this.state.telefones];
        telefones.splice(index, 1);
        this.setState({ telefones });
    }

    render() {
        const { cliente, setEditando } = this.props;
        const { rgs, telefones } = this.state;

        return (
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="card w-50 p-4">
                    <h2 className="text-center mb-4">Editar Cliente</h2>
                    <form>
                        <div className="mb-3">
                            <label htmlFor="nome" className="form-label">Nome</label>
                            <input type="text" className="form-control" id="nome" defaultValue={cliente.nome} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="nomeSocial" className="form-label">Nome Social</label>
                            <input type="text" className="form-control" id="nomeSocial" defaultValue={cliente.nomeSocial} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="rg0" className="form-label">RG</label>
                            <input type="text" className="form-control" id="rg0" value={rgs[0]} readOnly />
                        </div>
                        <div className="mb-3">
                            <input type="text" className="form-control" id="rg1" value={rgs[1]} readOnly />
                        </div>
                        {rgs.slice(2).map((rg, index) => (
                            <div className="mb-3 d-flex" key={index + 2}>
                                <input
                                    type="text"
                                    className="form-control me-2"
                                    value={rg}
                                    onChange={e => this.handleRGChange(index + 2, e.target.value)}
                                />
                                <button type="button" className="btn btn-danger" onClick={() => this.removeRG(index + 2)}>Remover</button>
                            </div>
                        ))}
                        <button type="button" className="btn btn-primary mb-3" onClick={() => this.addRG()}>Adicionar RG</button> <br />
                        <label htmlFor="telefone" className="form-label">Telefone</label>
                        {telefones.map((telefone, index) => (
                            <div className="mb-3 d-flex" key={index}>
                                <input
                                    type="text"
                                    className="form-control me-2"
                                    value={telefone}
                                    onChange={e => this.handleTelefoneChange(index, e.target.value)}
                                />
                                {index >= 2 && (
                                    <button type="button" className="btn btn-danger" onClick={() => this.removeTelefone(index)}>Remover</button>
                                )}
                            </div>
                        ))}
                        <button type="button" className="btn btn-primary mb-3" onClick={() => this.addTelefone()}>Adicionar Telefone</button>
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

export default EditarCliente;
