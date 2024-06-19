import React, { useState } from 'react';

type FormType = 'cliente' | 'pet' | 'servico' | 'produto' | null;

const Cadastrar: React.FC = () => {
  const [currentForm, setCurrentForm] = useState<FormType>(null);
  const [telefones, setTelefones] = useState<string[]>(['']);
  const [rgs, setRgs] = useState<string[]>(['']);
  const [nome, setNome] = useState('');
  const [nomeSocial, setNomeSocial] = useState('');
  const [cpf, setCpf] = useState('');
  const [cpfTutor, setCpfTutor] = useState('');
  const [nomePet, setNomePet] = useState('');
  const [animal, setAnimal] = useState('');
  const [raca, setRaca] = useState('');
  const [genero, setGenero] = useState('');
  const [tipo, setTipo] = useState('');
  const [nomeServico, setNomeServico] = useState('');
  const [valorServico, setValorServico] = useState('');
  const [nomeProduto, setNomeProduto] = useState('');
  const [valorProduto, setValorProduto] = useState('');

  const toggleForm = (form: FormType) => {
    setCurrentForm(prevForm => (prevForm === form ? null : form));
  };

  const handleChange = (index: number, field: 'telefones' | 'rgs', value: string) => {
    if (field === 'telefones') {
      const newTelefones = [...telefones];
      newTelefones[index] = value;
      setTelefones(newTelefones);
    } else {
      const newRgs = [...rgs];
      newRgs[index] = value;
      setRgs(newRgs);
    }
  };

  const addField = (field: 'telefones' | 'rgs') => {
    if (field === 'telefones') {
      setTelefones([...telefones, '']);
    } else {
      setRgs([...rgs, '']);
    }
  };

  const removeField = (index: number, field: 'telefones' | 'rgs') => {
    if (field === 'telefones') {
      const newTelefones = [...telefones];
      newTelefones.splice(index, 1);
      setTelefones(newTelefones);
    } else {
      const newRgs = [...rgs];
      newRgs.splice(index, 1);
      setRgs(newRgs);
    }
  };

  const handleSubmitCliente = async (event: React.FormEvent) => {
    event.preventDefault();

    const clienteData = {
      nome,
      nome_social: nomeSocial,
      cpf,
      rgs,
      telefones,
    };

    try {
      const response = await fetch('http://localhost:5000/cadastrar-cliente', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(clienteData),
      });

      if (response.status === 409) {
        alert('CPF já cadastrado');
        return;
      }

      if (!response.ok) {
        throw new Error('Erro ao cadastrar cliente');
      }

      alert('Cliente cadastrado com sucesso!');
      setNome('');
      setNomeSocial('');
      setCpf('');
      setRgs(['']);
      setTelefones(['']);
    } catch (error) {
      console.error(error);
      alert('Erro ao cadastrar cliente.');
    }
  };

  const handleSubmitPet = async (event: React.FormEvent) => {
    event.preventDefault();

    const petData = {
      cpf_tutor: cpfTutor,
      nome_pet: nomePet,
      animal,
      raca,
      genero,
      tipo,
    };

    try {
      const response = await fetch('http://localhost:5000/cadastrar-pet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(petData),
      });

      if (response.status === 404) {
        alert('Tutor não encontrado');
        return;
      }

      if (!response.ok) {
        throw new Error('Erro ao cadastrar pet');
      }

      alert('Pet cadastrado com sucesso!');
      setCpfTutor('');
      setNomePet('');
      setAnimal('');
      setRaca('');
      setGenero('');
      setTipo('');
    } catch (error) {
      console.error(error);
      alert('Erro ao cadastrar pet.');
    }
  };

  const handleSubmitServico = async (event: React.FormEvent) => {
    event.preventDefault();

    const servicoData = {
      nome: nomeServico,
      valor: valorServico,
    };

    try {
      const response = await fetch('http://localhost:5000/cadastrar-servico', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(servicoData),
      });

      if (!response.ok) {
        throw new Error('Erro ao cadastrar serviço');
      }

      alert('Serviço cadastrado com sucesso!');
      setNomeServico('');
      setValorServico('');
    } catch (error) {
      console.error(error);
      alert('Erro ao cadastrar serviço.');
    }
  };

  const handleSubmitProduto = async (event: React.FormEvent) => {
    event.preventDefault();

    const produtoData = {
      nome: nomeProduto,
      valor: valorProduto,
    };

    try {
      const response = await fetch('http://localhost:5000/cadastrar-produto', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(produtoData),
      });

      if (!response.ok) {
        throw new Error('Erro ao cadastrar produto');
      }

      alert('Produto cadastrado com sucesso!');
      setNomeProduto('');
      setValorProduto('');
    } catch (error) {
      console.error(error);
      alert('Erro ao cadastrar produto.');
    }
  };

  const renderForm = () => {
    switch (currentForm) {
      case 'cliente':
        return (
          <div>
            <h2 className="text-center m-3">Cadastro de Cliente</h2>
            <form onSubmit={handleSubmitCliente}>
              <div className="form-floating mb-3 w-100">
                <input
                  type="text"
                  className="form-control"
                  id="floatingNome"
                  placeholder="Nome"
                  value={nome}
                  onChange={e => setNome(e.target.value)}
                />
                <label htmlFor="floatingNome">Nome</label>
              </div>
              <div className="form-floating mb-3 w-100">
                <input
                  type="text"
                  className="form-control"
                  id="floatingNomeSocial"
                  placeholder="Nome social"
                  value={nomeSocial}
                  onChange={e => setNomeSocial(e.target.value)}
                />
                <label htmlFor="floatingNomeSocial">Nome social</label>
              </div>
              <div className="form-floating mb-3 w-100">
                <input
                  type="text"
                  className="form-control"
                  id="floatingCpf"
                  placeholder="CPF"
                  value={cpf}
                  onChange={e => setCpf(e.target.value)}
                />
                <label htmlFor="floatingCpf">CPF</label>
              </div>
              <div className="mb-3 w-100">
                {rgs.map((rg, index) => (
                  <div className="d-flex mb-2" key={index}>
                    <div className="form-floating flex-grow-1 me-2">
                      <input
                        type="text"
                        className="form-control"
                        id={`floatingRG${index}`}
                        placeholder="RG"
                        value={rg}
                        onChange={e => handleChange(index, 'rgs', e.target.value)}
                      />
                      <label htmlFor={`floatingRG${index}`}>RG</label>
                    </div>
                    {rgs.length > 1 && (
                      <button type="button" className="btn btn-danger me-2" onClick={() => removeField(index, 'rgs')}>
                        Remover
                      </button>
                    )}
                    {index === rgs.length - 1 && (
                      <button type="button" className="btn btn-primary" onClick={() => addField('rgs')}>
                        Adicionar RG
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <div className="mb-3 w-100">
                {telefones.map((telefone, index) => (
                  <div className="d-flex mb-2" key={index}>
                    <div className="form-floating flex-grow-1 me-2">
                      <input
                        type="text"
                        className="form-control"
                        id={`floatingTelefone${index}`}
                        placeholder="Telefone"
                        value={telefone}
                        onChange={e => handleChange(index, 'telefones', e.target.value)}
                      />
                      <label htmlFor={`floatingTelefone${index}`}>Telefone</label>
                    </div>
                    {telefones.length > 1 && (
                      <button type="button" className="btn btn-danger me-2" onClick={() => removeField(index, 'telefones')}>
                        Remover
                      </button>
                    )}
                    {index === telefones.length - 1 && (
                      <button type="button" className="btn btn-primary" onClick={() => addField('telefones')}>
                        Adicionar Telefone
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <div className="d-flex justify-content-center align-items-center flex-column">
                <button type="submit" className="btn btn-success">Enviar</button>
              </div>
            </form>
          </div>
        );
      case 'pet':
        return (
          <div>
            <h2 className="text-center m-3">Cadastro de Pet</h2>
            <form onSubmit={handleSubmitPet}>
              <div className="form-floating mb-3 w-100">
                <input
                  type="text"
                  className="form-control"
                  id="floatingTutor"
                  placeholder="CPF do tutor"
                  value={cpfTutor}
                  onChange={e => setCpfTutor(e.target.value)}
                />
                <label htmlFor="floatingTutor">CPF do tutor</label>
              </div>
              <div className="form-floating mb-3 w-100">
                <input
                  type="text"
                  className="form-control"
                  id="floatingNomePet"
                  placeholder="Nome do pet"
                  value={nomePet}
                  onChange={e => setNomePet(e.target.value)}
                />
                <label htmlFor="floatingNomePet">Nome do pet</label>
              </div>
              <div className="form-floating mb-3 w-100">
                <input
                  type="text"
                  className="form-control"
                  id="floatingAnimal"
                  placeholder="Animal"
                  value={animal}
                  onChange={e => setAnimal(e.target.value)}
                />
                <label htmlFor="floatingAnimal">Animal</label>
              </div>
              <div className="form-floating mb-3 w-100">
                <input
                  type="text"
                  className="form-control"
                  id="floatingRaca"
                  placeholder="Raça"
                  value={raca}
                  onChange={e => setRaca(e.target.value)}
                />
                <label htmlFor="floatingRaca">Raça</label>
              </div>
              <div className="form-floating mb-3 w-100">
                <input
                  type="text"
                  className="form-control"
                  id="floatingGenero"
                  placeholder="Gênero"
                  value={genero}
                  onChange={e => setGenero(e.target.value)}
                />
                <label htmlFor="floatingGenero">Gênero</label>
              </div>
              <div className="form-floating mb-3 w-100">
                <input
                  type="text"
                  className="form-control"
                  id="floatingTipo"
                  placeholder="Tipo"
                  value={tipo}
                  onChange={e => setTipo(e.target.value)}
                />
                <label htmlFor="floatingTipo">Tipo</label>
              </div>
              <div className="d-flex justify-content-center align-items-center flex-column">
                <button type="submit" className="btn btn-success">Enviar</button>
              </div>
            </form>
          </div>
        );
      case 'servico':
        return (
          <div>
            <h2 className="text-center m-3">Cadastro de Serviço</h2>
            <form onSubmit={handleSubmitServico}>
              <div className="form-floating mb-3 w-100">
                <input
                  type="text"
                  className="form-control"
                  id="floatingNomeServico"
                  placeholder="Nome"
                  value={nomeServico}
                  onChange={e => setNomeServico(e.target.value)}
                />
                <label htmlFor="floatingNomeServico">Nome</label>
              </div>
              <div className="form-floating mb-3 w-100">
                <input
                  type="text"
                  className="form-control"
                  id="floatingValorServico"
                  placeholder="Valor"
                  value={valorServico}
                  onChange={e => setValorServico(e.target.value)}
                />
                <label htmlFor="floatingValorServico">Valor</label>
              </div>
              <div className="d-flex justify-content-center align-items-center flex-column">
                <button type="submit" className="btn btn-success">Enviar</button>
              </div>
            </form>
          </div>
        );
      case 'produto':
        return (
          <div>
            <h2 className="text-center m-3">Cadastro de Produto</h2>
            <form onSubmit={handleSubmitProduto}>
              <div className="form-floating mb-3 w-100">
                <input
                  type="text"
                  className="form-control"
                  id="floatingNomeProduto"
                  placeholder="Nome"
                  value={nomeProduto}
                  onChange={e => setNomeProduto(e.target.value)}
                />
                <label htmlFor="floatingNomeProduto">Nome</label>
              </div>
              <div className="form-floating mb-3 w-100">
                <input
                  type="text"
                  className="form-control"
                  id="floatingValorProduto"
                  placeholder="Valor"
                  value={valorProduto}
                  onChange={e => setValorProduto(e.target.value)}
                />
                <label htmlFor="floatingValorProduto">Valor</label>
              </div>
              <div className="d-flex justify-content-center align-items-center flex-column">
                <button type="submit" className="btn btn-success">Enviar</button>
              </div>
            </form>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center flex-column mt-5">
      <h1>Cadastro</h1>
      <p>Selecione abaixo o que você deseja cadastrar</p>
      <div>
        <button className="m-3 btn btn-primary" onClick={() => toggleForm('cliente')}>
          Cadastrar cliente
        </button>
        <button className="m-3 btn btn-primary" onClick={() => toggleForm('pet')}>
          Cadastrar pet
        </button>
        <button className="m-3 btn btn-primary" onClick={() => toggleForm('servico')}>
          Cadastrar serviço
        </button>
        <button className="m-3 btn btn-primary" onClick={() => toggleForm('produto')}>
          Cadastrar produto
        </button>
      </div>
      {renderForm()}
    </div>
  );
};

export default Cadastrar;
