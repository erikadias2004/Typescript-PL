import React, { useState, useEffect } from 'react';
import ConsumoCliente from './consumoCliente';

type Cliente = {
  id: number;
  nome: string;
  cpf: string;
};

const TabelaConsumo: React.FC = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [verificandoConsumo, setVerificandoConsumo] = useState<boolean>(false);
  const [clienteVerificando, setClienteVerificando] = useState<Cliente | null>(null);
  const [pesquisaCPF, setPesquisaCPF] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchClientes = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:5000/clientes-tabela');
        const data = await response.json();
        if (response.ok) {
          setClientes(data.clientes);
        } else {
          alert(data.error || 'Erro ao buscar clientes');
        }
      } catch (error) {
        console.error('Erro ao buscar clientes:', error);
        alert('Erro ao buscar clientes');
      } finally {
        setLoading(false);
      }
    };

    fetchClientes();
  }, []);

  const handleVerificarConsumo = (cliente: Cliente) => {
    setClienteVerificando(cliente);
    setVerificandoConsumo(true);
  };

  const handlePesquisaCPFChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setPesquisaCPF(value);
  };

  const clientesFiltrados = clientes.filter(cliente => cliente.cpf.includes(pesquisaCPF));

  if (verificandoConsumo && clienteVerificando) {
    return <ConsumoCliente cliente={clienteVerificando} setVerificandoConsumo={setVerificandoConsumo} />;
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
          onChange={handlePesquisaCPFChange} 
        />
      </div>
      {loading ? (
        <p>Carregando...</p>
      ) : (
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
                  <button className="btn btn-primary" onClick={() => handleVerificarConsumo(cliente)}>Visualizar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TabelaConsumo;
