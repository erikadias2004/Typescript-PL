import React, { useState } from 'react';

type Props = {
    cliente: { id: number, nome: string, nomeSocial: string, rgs: string[], telefones: string[], dataCadastro: string },
    setEditando: (value: boolean) => void
}

const EditarCliente: React.FC<Props> = ({ cliente, setEditando }) => {
    const [rgs, setRgs] = useState<string[]>([...cliente.rgs]);
    const [telefones, setTelefones] = useState<string[]>([...cliente.telefones]);

    const handleRGChange = (index: number, value: string) => {
        const newRgs = [...rgs];
        newRgs[index] = value;
        setRgs(newRgs);
    };

    const addRG = () => {
        setRgs([...rgs, '']);
    };

    const removeRG = (index: number) => {
        const newRgs = [...rgs];
        newRgs.splice(index, 1);
        setRgs(newRgs);
    };

    const handleTelefoneChange = (index: number, value: string) => {
        const newTelefones = [...telefones];
        newTelefones[index] = value;
        setTelefones(newTelefones);
    };

    const addTelefone = () => {
        setTelefones([...telefones, '']);
    };

    const removeTelefone = (index: number) => {
        const newTelefones = [...telefones];
        newTelefones.splice(index, 1);
        setTelefones(newTelefones);
    };

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
                                onChange={e => handleRGChange(index + 2, e.target.value)}
                            />
                            <button type="button" className="btn btn-danger" onClick={() => removeRG(index + 2)}>Remover</button>
                        </div>
                    ))}
                    <button type="button" className="btn btn-primary mb-3" onClick={addRG}>Adicionar RG</button> <br />
                    <label htmlFor="telefone" className="form-label">Telefone</label>
                    {telefones.map((telefone, index) => (
                        <div className="mb-3 d-flex" key={index}>
                            <input
                                type="text"
                                className="form-control me-2"
                                value={telefone}
                                onChange={e => handleTelefoneChange(index, e.target.value)}
                            />
                            {index >= 2 && (
                                <button type="button" className="btn btn-danger" onClick={() => removeTelefone(index)}>Remover</button>
                            )}
                        </div>
                    ))}
                    <button type="button" className="btn btn-primary mb-3" onClick={addTelefone}>Adicionar Telefone</button>
                    <div className="d-flex justify-content-end">
                        <button type="button" className="btn btn-secondary me-2" onClick={() => setEditando(false)}>Voltar</button>
                        <button type="submit" className="btn btn-success">Editar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditarCliente;