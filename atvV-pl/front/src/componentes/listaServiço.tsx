import React, { useEffect, useState } from 'react';
import EditarServico from './editarServico';

type Servico = {
  id: number;
  nome: string;
  valor: string;
};

const ListaServico: React.FC = () => {
  const [servicos, setServicos] = useState<Servico[]>([]);
  const [editando, setEditando] = useState<boolean>(false);
  const [servicoEditando, setServicoEditando] = useState<Servico | null>(null);

  const fetchServicos = async () => {
    try {
      const response = await fetch('http://localhost:5000/servicos');
      if (!response.ok) {
        throw new Error('Erro ao buscar serviços');
      }
      const data = await response.json();
      setServicos(data);
    } catch (error) {
      console.error(error);
      setServicos([]);
    }
  };

  useEffect(() => {
    fetchServicos();
  }, []);

  const handleDelete = async (servicoId: number) => {
    try {
      const response = await fetch(`http://localhost:5000/servicos/${servicoId}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Erro ao deletar serviço');
      }
      setServicos(servicos.filter((s) => s.id !== servicoId));
      alert('Serviço deletado com sucesso');
    } catch (error:any) {
      console.error(error);
      alert(error.message || 'Erro ao deletar serviço');
    }
  };

  const handleEdit = (servico: Servico) => {
    setServicoEditando(servico);
    setEditando(true);
  };

  if (editando && servicoEditando) {
    return <EditarServico servico={servicoEditando} setEditando={setEditando} />;
  }

  return (
    <div className="m-5">
      <h2 className="text-center">Serviços cadastrados</h2>
      <p className="text-center mb-5">Visualize abaixo todos os serviços cadastrados até o momento</p>
      {servicos.map((servico, index) => (
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
                <h5>{servico.nome}</h5>
              </button>
            </h2>
            <div
              id={`flush-collapseOne${index}`}
              className="accordion-collapse collapse"
              data-bs-parent={`#accordionFlushExample${index}`}
            >
              <div className="accordion-body">
                <div className="p-3">
                  <p><strong>Nome: </strong>{servico.nome}</p>
                  <p><strong>Valor: </strong>R${servico.valor}</p>
                  <button className="btn btn-primary me-2" onClick={() => handleEdit(servico)}>Editar</button>
                  <button className="btn btn-danger" onClick={() => handleDelete(servico.id)}>Deletar</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListaServico;

