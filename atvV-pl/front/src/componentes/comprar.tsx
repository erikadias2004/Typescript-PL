import React, { useState, useEffect } from 'react';

type FormType = 'produto' | 'servico' | null;

type Produto = {
  id: number;
  nome: string;
  valor: string;
};

type Servico = {
  id: number;
  nome: string;
  valor: string;
};

type Pet = {
  id: number;
  nome_pet: string;
  animal: string;
  raca: string;
  tipo: string;
};

const Comprar: React.FC = () => {
  const [cpf, setCpf] = useState<string>('');
  const [clienteId, setClienteId] = useState<number | null>(null);
  const [pets, setPets] = useState<Pet[]>([]);
  const [selectedPet, setSelectedPet] = useState<number | null>(null);
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const [currentForm, setCurrentForm] = useState<FormType>(null);
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [servicos, setServicos] = useState<Servico[]>([]);
  const [quantidade, setQuantidade] = useState<number>(1);

  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCpf(e.target.value);
  };

  const handleCpfSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/clientes/cpf/${cpf}`);
      const data = await response.json();
      if (data.id) {
        setClienteId(data.id);
        setPets(data.pets);
        setShowOptions(true);
      } else {
        alert('Cliente não encontrado');
      }
    } catch (error) {
      console.error('Erro ao buscar cliente:', error);
      alert('Erro ao buscar cliente');
    }
    setCpf('');
  };

  const fetchProdutos = async () => {
    try {
      const response = await fetch('http://localhost:5000/produtos');
      const data = await response.json();
      setProdutos(data);
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
    }
  };

  const fetchServicos = async () => {
    try {
      const response = await fetch('http://localhost:5000/servicos');
      const data = await response.json();
      setServicos(data);
    } catch (error) {
      console.error('Erro ao buscar serviços:', error);
    }
  };

  useEffect(() => {
    fetchProdutos();
    fetchServicos();
  }, []);

  const toggleForm = (form: FormType) => {
    setCurrentForm(prevForm => (prevForm === form ? null : form));
  };

  const handleCompraProduto = async (produtoId: number) => {
    if (!clienteId || !selectedPet) {
      alert('Selecione um pet');
      return;
    }

    const selectedPetDetails = pets.find(pet => pet.id === selectedPet);

    if (!selectedPetDetails) {
      alert('Pet não encontrado');
      return;
    }

    const { animal, raca, tipo } = selectedPetDetails;

    try {
      const response = await fetch('http://localhost:5000/comprar-produto', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cliente_id: clienteId, pet_id: selectedPet, produto_id: produtoId, quantidade, animal, raca, tipo }),
      });
      const data = await response.json();
      if (response.ok) {
        alert('Produto comprado com sucesso');
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error('Erro ao comprar produto:', error);
      alert('Erro ao comprar produto');
    }
  };

  const handleCompraServico = async (servicoId: number) => {
    if (!clienteId || !selectedPet) {
      alert('Selecione um pet');
      return;
    }

    const selectedPetDetails = pets.find(pet => pet.id === selectedPet);

    if (!selectedPetDetails) {
      alert('Pet não encontrado');
      return;
    }

    const { animal, raca, tipo } = selectedPetDetails;

    try {
      const response = await fetch('http://localhost:5000/comprar-servico', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cliente_id: clienteId, pet_id: selectedPet, servico_id: servicoId, quantidade, animal, raca, tipo }),
      });
      const data = await response.json();
      if (response.ok) {
        alert('Serviço comprado com sucesso');
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error('Erro ao comprar serviço:', error);
      alert('Erro ao comprar serviço');
    }
  };

  const renderForm = () => {
    switch (currentForm) {
      case 'produto':
        return (
          <div className="mt-3">
            <h3>Produtos Disponíveis</h3>
            {produtos.map(produto => (
              <div key={produto.id} className="card mb-2">
                <div className="card-body">
                  <h5 className="card-title">{produto.nome}</h5>
                  <p className="card-text">{produto.valor}</p>
                  <button className="btn btn-success" onClick={() => handleCompraProduto(produto.id)}>
                    Comprar Produto
                  </button>
                </div>
              </div>
            ))}
          </div>
        );
      case 'servico':
        return (
          <div className="mt-3">
            <h3>Serviços Disponíveis</h3>
            {servicos.map(servico => (
              <div key={servico.id} className="card mb-2">
                <div className="card-body">
                  <h5 className="card-title">{servico.nome}</h5>
                  <p className="card-text">{servico.valor}</p>
                  <button className="btn btn-success" onClick={() => handleCompraServico(servico.id)}>
                    Comprar Serviço
                  </button>
                </div>
              </div>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mt-5">
      <form onSubmit={handleCpfSubmit}>
        <div className="mb-3">
          <label htmlFor="cpfInput" className="form-label">Informe o CPF</label>
          <input
            type="text"
            className="form-control"
            id="cpfInput"
            value={cpf}
            onChange={handleCpfChange}
            placeholder="CPF"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {showOptions ? 'Alterar CPF' : 'Enviar'}
        </button>
      </form>

      {showOptions && (
        <div className='mb-5'>
          <h2 className='text-center mt-5'>Selecione um pet para realizar a compra</h2>
          <div className="form-group">
            <label htmlFor="selectPet">Pets</label>
            <select className="form-control" id="selectPet" onChange={(e) => setSelectedPet(Number(e.target.value))}>
              <option value="">Selecione um pet</option>
              {pets.map(pet => (
                <option key={pet.id} value={pet.id}>{pet.nome_pet}</option>
              ))}
            </select>
          </div>
          <div className='d-flex justify-content-center mt-3'>
            <button className="btn btn-primary m-2" onClick={() => toggleForm('produto')}>
              Comprar Produto
            </button>
            <button className="btn btn-primary m-2" onClick={() => toggleForm('servico')}>
              Comprar Serviço
            </button>
          </div>
        </div>
      )}

      {renderForm()}
    </div>
  );
};

export default Comprar;
