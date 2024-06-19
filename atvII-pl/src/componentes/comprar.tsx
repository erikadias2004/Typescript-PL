import React, { Component } from 'react';

type FormType = 'produto' | 'servico' | null;

type State = {
  cpf: string;
  showOptions: boolean;
  currentForm: FormType;
};

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

export default class Comprar extends Component<{}, State> {
  state: State = {
    cpf: '',
    showOptions: false,
    currentForm: null,
  };

  produtos: Produto[] = Array.from({ length: 5 }, (_, i) => ({
    id: i + 1,
    nome: `Produto ${i + 1}`,
    valor: `R$ ${(i + 1) * 10}`
  }));

  servicos: Servico[] = Array.from({ length: 5 }, (_, i) => ({
    id: i + 1,
    nome: `Serviço ${i + 1}`,
    valor: `R$ ${(i + 1) * 15}`
  }));

  handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ cpf: e.target.value });
  };

  handleCpfSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    this.setState({ showOptions: true, cpf: '' });
  };

  toggleForm = (form: FormType) => {
    this.setState(prevState => ({
      currentForm: prevState.currentForm === form ? null : form,
    }));
  };

  renderForm = () => {
    const { currentForm } = this.state;
    switch (currentForm) {
      case 'produto':
        return (
          <div className="mt-3">
            <h3>Produtos Disponíveis</h3>
            {this.produtos.map(produto => (
              <div key={produto.id} className="card mb-2">
                <div className="card-body">
                  <h5 className="card-title">{produto.nome}</h5>
                  <p className="card-text">{produto.valor}</p>
                  <button className="btn btn-success" onClick={() => alert(`Produto ${produto.nome} comprado!`)}>
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
            {this.servicos.map(servico => (
              <div key={servico.id} className="card mb-2">
                <div className="card-body">
                  <h5 className="card-title">{servico.nome}</h5>
                  <p className="card-text">{servico.valor}</p>
                  <button className="btn btn-success" onClick={() => alert(`Serviço ${servico.nome} comprado!`)}>
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

  render() {
    const { cpf, showOptions } = this.state;

    return (
      <div className="container mt-5">
        <form onSubmit={this.handleCpfSubmit}>
          <div className="mb-3">
            <label htmlFor="cpfInput" className="form-label">Informe o CPF</label>
            <input
              type="text"
              className="form-control"
              id="cpfInput"
              value={cpf}
              onChange={this.handleCpfChange}
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
            <h2 className='text-center mt-5'>Realize a compra abaixo para o CPF tal</h2>
            <div className='d-flex justify-content-center'>
                <button className="btn btn-primary m-2" onClick={() => this.toggleForm('produto')}>
                Comprar Produto
                </button>
                <button className="btn btn-primary m-2" onClick={() => this.toggleForm('servico')}>
                Comprar Serviço
                </button>
            </div>
          </div>
        )}

        {this.renderForm()}
      </div>
    );
  }
}
