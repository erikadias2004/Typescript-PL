import React, { useEffect, useState } from 'react';
import EditarProduto from './editarProduto';

type Produto = {
  id: number;
  nome: string;
  valor: string;
};

const ListaProduto: React.FC = () => {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [editando, setEditando] = useState<boolean>(false);
  const [produtoEditando, setProdutoEditando] = useState<Produto | null>(null);

  const fetchProdutos = async () => {
    try {
      const response = await fetch('http://localhost:5000/produtos');
      if (!response.ok) {
        throw new Error('Erro ao buscar produtos');
      }
      const data = await response.json();
      setProdutos(data);
    } catch (error) {
      console.error(error);
      setProdutos([]);
    }
  };

  useEffect(() => {
    fetchProdutos();
  }, []);

  const handleDelete = async (produtoId: number) => {
    try {
      const response = await fetch(`http://localhost:5000/produtos/${produtoId}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Erro ao deletar produto');
      }
      setProdutos(produtos.filter((p) => p.id !== produtoId));
      alert('Produto deletado com sucesso');
    } catch (error:any) {
      console.error(error);
      alert(error.message || 'Erro ao deletar produto');
    }
  };

  const handleEdit = (produto: Produto) => {
    setProdutoEditando(produto);
    setEditando(true);
  };

  if (editando && produtoEditando) {
    return <EditarProduto produto={produtoEditando} setEditando={setEditando} />;
  }

  return (
    <div className="m-5">
      <h2 className="text-center">Produtos cadastrados</h2>
      <p className="text-center mb-5">Visualize abaixo todos os produtos cadastrados até o momento</p>
      {produtos.map((produto, index) => (
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
                <h5>{produto.nome}</h5>
              </button>
            </h2>
            <div
              id={`flush-collapseOne${index}`}
              className="accordion-collapse collapse"
              data-bs-parent={`#accordionFlushExample${index}`}
            >
              <div className="accordion-body">
                <div className="p-3">
                  <p><strong>Nome: </strong>{produto.nome}</p>
                  <p><strong>Valor: </strong>R${produto.valor}</p>
                  <button className="btn btn-primary me-2" onClick={() => handleEdit(produto)}>Editar</button>
                  <button className="btn btn-danger" onClick={() => handleDelete(produto.id)}>Deletar</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListaProduto;

