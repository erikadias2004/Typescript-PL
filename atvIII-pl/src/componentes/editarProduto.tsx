import React, { useState } from 'react';

type Produto = {
    id: number,
    nome: string,
    valor: string
};

type Props = {
    produto: Produto,
    setEditando: (value: boolean) => void
};

const EditarProduto: React.FC<Props> = ({ produto, setEditando }) => {
    const [nome, setNome] = useState<string>(produto.nome);
    const [valor, setValor] = useState<string>(produto.valor);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        if (name === "nome") {
            setNome(value);
        } else if (name === "valor") {
            setValor(value);
        }
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Implementar lógica de atualização do produto aqui
        setEditando(false);
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="card w-50 p-4">
                <h2 className="text-center mb-4">Editar Produto</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="nome" className="form-label">Nome</label>
                        <input type="text" className="form-control" id="nome" name="nome" value={nome} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="valor" className="form-label">Valor</label>
                        <input type="text" className="form-control" id="valor" name="valor" value={valor} onChange={handleChange} />
                    </div>
                    <div className="d-flex justify-content-end">
                        <button type="button" className="btn btn-secondary me-2" onClick={() => setEditando(false)}>Voltar</button>
                        <button type="submit" className="btn btn-success">Editar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditarProduto;
