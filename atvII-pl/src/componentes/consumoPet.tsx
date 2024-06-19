import React, { Component } from 'react';

interface State {
  selectedAnimal: string;
  selectedRace: string;
  selectedType: string;
  products: { name: string; animal: string; race: string; type: string; quantity: number }[];
  filteredProducts: { name: string; animal: string; race: string; type: string; quantity: number }[];
  races: string[];
  types: string[];
}

class ProductFilter extends Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      selectedAnimal: '',
      selectedRace: '',
      selectedType: '',
      products: [
        { name: 'Produto 1', animal: 'Cachorro', race: 'Poodle', type: 'Poodle Pequeno', quantity: 10 },
        { name: 'Produto 2', animal: 'Gato', race: 'Siamês', type: 'Gato Pequeno', quantity: 5 },
        { name: 'Produto 3', animal: 'Cachorro', race: 'Poodle', type: 'Poodle Grande', quantity: 7 },
        { name: 'Produto 4', animal: 'Pássaro', race: 'Canário', type: 'Pássaro Pequeno', quantity: 3 },
        { name: 'Produto 5', animal: 'Gato', race: 'Siamês', type: 'Gato Grande', quantity: 8 },
      ],
      filteredProducts: [],
      races: [],
      types: [],
    };
  }

  componentDidMount() {
    this.setState({ filteredProducts: this.state.products.sort((a, b) => b.quantity - a.quantity) });
  }

  handleAnimalChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedAnimal = event.target.value;
    const races = Array.from(new Set(this.state.products.filter(product => product.animal === selectedAnimal).map(product => product.race)));
    this.setState({ selectedAnimal, selectedRace: '', selectedType: '', races, types: [], filteredProducts: this.filterAndSortProducts(selectedAnimal, '', '') });
  };

  handleRaceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedRace = event.target.value;
    const types = Array.from(new Set(this.state.products.filter(product => product.race === selectedRace).map(product => product.type)));
    this.setState({ selectedRace, selectedType: '', types, filteredProducts: this.filterAndSortProducts(this.state.selectedAnimal, selectedRace, '') });
  };

  handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedType = event.target.value;
    this.setState({ selectedType, filteredProducts: this.filterAndSortProducts(this.state.selectedAnimal, this.state.selectedRace, selectedType) });
  };

  filterAndSortProducts = (selectedAnimal: string, selectedRace: string, selectedType: string) => {
    let filteredProducts = this.state.products;

    if (selectedAnimal) {
      filteredProducts = filteredProducts.filter(product => product.animal === selectedAnimal);
    }

    if (selectedRace) {
      filteredProducts = filteredProducts.filter(product => product.race === selectedRace);
    }

    if (selectedType) {
      filteredProducts = filteredProducts.filter(product => product.type === selectedType);
    }

    return filteredProducts.sort((a, b) => b.quantity - a.quantity);
  };

  render() {
    const { selectedAnimal, selectedRace, selectedType, filteredProducts, races, types } = this.state;
    return (
      <div className="container mt-5">
        <div className="row mb-4">
          <div className="col">
            <label htmlFor="animalFilter">Filtrar por Animal</label>
            <select id="animalFilter" className="form-control" value={selectedAnimal} onChange={this.handleAnimalChange}>
              <option value="">Selecione o Animal</option>
              <option value="Cachorro">Cachorro</option>
              <option value="Gato">Gato</option>
              <option value="Pássaro">Pássaro</option>
            </select>
          </div>
          <div className="col">
            <label htmlFor="raceFilter">Filtrar por Raça</label>
            <select id="raceFilter" className="form-control" value={selectedRace} onChange={this.handleRaceChange} disabled={!selectedAnimal}>
              <option value="">{selectedAnimal ? "Selecione a Raça" : "Selecione o Animal primeiro"}</option>
              {races.map(race => (
                <option key={race} value={race}>{race}</option>
              ))}
            </select>
          </div>
          <div className="col">
            <label htmlFor="typeFilter">Filtrar por Tipo</label>
            <select id="typeFilter" className="form-control" value={selectedType} onChange={this.handleTypeChange} disabled={!selectedRace}>
              <option value="">{selectedRace ? "Selecione o Tipo" : "Selecione a Raça primeiro"}</option>
              {types.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        </div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Produto</th>
              {selectedAnimal && <th>Animal</th>}
              {selectedRace && <th>Raça</th>}
              {selectedType && <th>Tipo</th>}
              <th>Quantidade</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product, index) => (
              <tr key={index}>
                <td>{product.name}</td>
                {selectedAnimal && <td>{product.animal}</td>}
                {selectedRace && <td>{product.race}</td>}
                {selectedType && <td>{product.type}</td>}
                <td>{product.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default ProductFilter;
