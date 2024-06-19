import React, { Component } from 'react';

type FormType = 'cliente' | 'pet' | 'servico' | 'produto' | null;

type State = {
  currentForm: FormType;
  telefones: string[];
  rgs: string[];
};

export default class Cadastrar extends Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      currentForm: null,
      telefones: [''],
      rgs: [''],
    };
  }

  toggleForm = (form: FormType) => {
    this.setState(prevState => ({
      currentForm: prevState.currentForm === form ? null : form,
    }));
  };

  handleChange = (index: number, field: 'telefones' | 'rgs', value: string) => {
    const newArray = [...this.state[field]];
    newArray[index] = value;
    this.setState({ [field]: newArray } as any);
  };

  addField = (field: 'telefones' | 'rgs') => {
    this.setState(prevState => ({
      [field]: [...prevState[field], ''],
    } as any));
  };

  removeField = (index: number, field: 'telefones' | 'rgs') => {
    const newArray = [...this.state[field]];
    newArray.splice(index, 1);
    this.setState({ [field]: newArray } as any);
  };

  renderForm = () => {
    const { currentForm, telefones, rgs } = this.state;
    switch (currentForm) {
      case 'cliente':
        return (
          <div>
            <h2 className="text-center m-3">Cadastro de Cliente</h2>
            <form>
              <div className="form-floating mb-3 w-100">
                <input type="text" className="form-control" id="floatingNome" placeholder="Nome" />
                <label htmlFor="floatingNome">Nome</label>
              </div>
              <div className="form-floating mb-3 w-100">
                <input type="text" className="form-control" id="floatingNomeSocial" placeholder="Nome social" />
                <label htmlFor="floatingNomeSocial">Nome social</label>
              </div>
              <div className="form-floating mb-3 w-100">
                <input type="text" className="form-control" id="floatingCPF" placeholder="CPF" />
                <label htmlFor="floatingCPF">CPF</label>
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
                        onChange={e => this.handleChange(index, 'rgs', e.target.value)}
                      />
                      <label htmlFor={`floatingRG${index}`}>RG</label>
                    </div>
                    {rgs.length > 1 && (
                      <button type="button" className="btn btn-danger me-2" onClick={() => this.removeField(index, 'rgs')}>
                        Remover
                      </button>
                    )}
                    {index === rgs.length - 1 && (
                      <button type="button" className="btn btn-primary" onClick={() => this.addField('rgs')}>
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
                        onChange={e => this.handleChange(index, 'telefones', e.target.value)}
                      />
                      <label htmlFor={`floatingTelefone${index}`}>Telefone</label>
                    </div>
                    {telefones.length > 1 && (
                      <button type="button" className="btn btn-danger me-2" onClick={() => this.removeField(index, 'telefones')}>
                        Remover
                      </button>
                    )}
                    {index === telefones.length - 1 && (
                      <button type="button" className="btn btn-primary" onClick={() => this.addField('telefones')}>
                        Adicionar Telefone
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <div className="form-floating mb-3 w-100">
                <input type="date" className="form-control" id="floatingDataCadastro" placeholder="Data de cadastro" />
                <label htmlFor="floatingDataCadastro">Data de cadastro</label>
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
            <form>
              <div className="form-floating mb-3 w-100">
                <input type="text" className="form-control" id="floatingTutor" placeholder="CPF do tutor" />
                <label htmlFor="floatingTutor">CPF do tutor</label>
              </div>
              <div className="form-floating mb-3 w-100">
                <input type="text" className="form-control" id="floatingNomePet" placeholder="Nome do pet" />
                <label htmlFor="floatingNomePet">Nome do pet</label>
              </div>
              <div className="form-floating mb-3 w-100">
                <input type="text" className="form-control" id="floatingRaca" placeholder="Raça" />
                <label htmlFor="floatingRaca">Raça</label>
              </div>
              <div className="form-floating mb-3 w-100">
                <input type="text" className="form-control" id="floatingGenero" placeholder="Gênero" />
                <label htmlFor="floatingGenero">Gênero</label>
              </div>
              <div className="form-floating mb-3 w-100">
                <input type="text" className="form-control" id="floatingTipo" placeholder="Tipo" />
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
            <form>
              <div className="form-floating mb-3 w-100">
                <input type="text" className="form-control" id="floatingNomeServico" placeholder="Nome" />
                <label htmlFor="floatingNomeServico">Nome</label>
              </div>
              <div className="form-floating mb-3 w-100">
                <input type="text" className="form-control" id="floatingValorServico" placeholder="Valor" />
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
            <form>
              <div className="form-floating mb-3 w-100">
                <input type="text" className="form-control" id="floatingNomeProduto" placeholder="Nome" />
                <label htmlFor="floatingNomeProduto">Nome</label>
              </div>
              <div className="form-floating mb-3 w-100">
                <input type="text" className="form-control" id="floatingValorProduto" placeholder="Valor" />
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

  render() {
    return (
      <div className="d-flex justify-content-center align-items-center flex-column mt-5">
        <h1>Cadastro</h1>
        <p>Selecione abaixo o que você deseja cadastrar</p>
        <div>
          <button className="m-3 btn btn-primary" onClick={() => this.toggleForm('cliente')}>
            Cadastrar cliente
          </button>
          <button className="m-3 btn btn-primary" onClick={() => this.toggleForm('pet')}>
            Cadastrar pet
          </button>
          <button className="m-3 btn btn-primary" onClick={() => this.toggleForm('servico')}>
            Cadastrar serviço
          </button>
          <button className="m-3 btn btn-primary" onClick={() => this.toggleForm('produto')}>
            Cadastrar produto
          </button>
        </div>
        {this.renderForm()}
      </div>
    );
  }
}
