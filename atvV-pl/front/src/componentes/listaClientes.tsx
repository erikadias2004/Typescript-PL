import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import EditarCliente from './editarCliente';

type Cliente = {
  id: number;
  nome: string;
  nome_social: string;
  cpf: string;
  rgs: string[];
  telefones: string[];
  data_cadastro: string;
};

const ListaCliente: React.FC = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [editando, setEditando] = useState<boolean>(false);
  const [clienteEditando, setClienteEditando] = useState<Cliente | null>(null);

  const fetchClientes = async () => {
    try {
      const response = await fetch('http://localhost:5000/clientes');
      if (!response.ok) {
        throw new Error('Erro ao buscar clientes');
      }
      const data = await response.json();
      console.log('Clientes recebidos do backend:', data);
      setClientes(data);
    } catch (error) {
      console.error(error);
      setClientes([]);
    }
  };

  useEffect(() => {
    fetchClientes();
  }, []);

  const handleDelete = async (clienteId: number) => {
    try {
      const response = await fetch(`http://localhost:5000/clientes/${clienteId}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Erro ao deletar cliente');
      }
      setClientes(clientes.filter((c) => c.id !== clienteId));
      alert('Cliente deletado com sucesso');
    } catch (error:any) {
      console.error(error);
      alert(error.message || 'Erro ao deletar cliente');
    }
  };

  const handleEdit = (cliente: Cliente) => {
    setClienteEditando(cliente);
    setEditando(true);
  };

  if (editando && clienteEditando) {
    return <EditarCliente cliente={clienteEditando} setEditando={setEditando} />;
  }

  return (
    <div className="m-5">
      <h2 className="text-center">Clientes cadastrados</h2>
      <p className="text-center mb-5">Visualize abaixo todos os clientes cadastrados até o momento</p>
      {clientes.length === 0 ? (
        <p className="text-center">Não tem nenhum cliente cadastrado.</p>
      ) : (
        clientes.map((cliente, index) => (
          <div className={`accordion accordion-flush border`} id={`accordionFlushExample${index}`} key={index}>
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className={`accordion-button collapsed`}
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#flush-collapseOne${index}`}
                  aria-expanded="false"
                  aria-controls={`flush-collapseOne${index}`}
                >
                  <h5>{cliente.nome}</h5>
                </button>
              </h2>
              <div
                id={`flush-collapseOne${index}`}
                className="accordion-collapse collapse"
                data-bs-parent={`#accordionFlushExample${index}`}
              >
                <div className="accordion-body">
                  <div className="p-3">
                    <p><strong>ID: </strong>{cliente.id}</p>
                    <p><strong>Nome: </strong>{cliente.nome}</p>
                    <p><strong>Nome social: </strong>{cliente.nome_social || 'N/A'}</p>
                    <p><strong>CPF: </strong>{cliente.cpf}</p>
                    <p><strong>RG: </strong>{Array.isArray(cliente.rgs) ? cliente.rgs.join(', ') : 'N/A'}</p>
                    <p><strong>Telefone: </strong>{Array.isArray(cliente.telefones) ? cliente.telefones.join(', ') : 'N/A'}</p>
                    <p><strong>Data de cadastro: </strong>{format(new Date(cliente.data_cadastro), 'dd/MM/yyyy - HH:mm')}</p>
                    <button className="btn btn-primary me-2" onClick={() => handleEdit(cliente)}>Editar</button>
                    <button className="btn btn-danger" onClick={() => handleDelete(cliente.id)}>Deletar</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ListaCliente;