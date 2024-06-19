import React, { useState, useEffect } from 'react';

interface Product {
  name: string;
  animal: string;
  race: string;
  type: string;
  quantity: number;
}

const ProductFilter: React.FC = () => {
  const [selectedAnimal, setSelectedAnimal] = useState<string>('');
  const [selectedRace, setSelectedRace] = useState<string>('');
  const [selectedType, setSelectedType] = useState<string>('');
  const [products] = useState<Product[]>([
    { name: 'Produto 1', animal: 'Cachorro', race: 'Poodle', type: 'Poodle Pequeno', quantity: 10 },
    { name: 'Produto 2', animal: 'Gato', race: 'Siamês', type: 'Gato Pequeno', quantity: 5 },
    { name: 'Produto 3', animal: 'Cachorro', race: 'Poodle', type: 'Poodle Grande', quantity: 7 },
    { name: 'Produto 4', animal: 'Pássaro', race: 'Canário', type: 'Pássaro Pequeno', quantity: 3 },
    { name: 'Produto 5', animal: 'Gato', race: 'Siamês', type: 'Gato Grande', quantity: 8 },
  ]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [races, setRaces] = useState<string[]>([]);
  const [types, setTypes] = useState<string[]>([]);

  useEffect(() => {
    setFilteredProducts(products.sort((a, b) => b.quantity - a.quantity));
  }, [products]);

  const handleAnimalChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedAnimal = event.target.value;
    const races = Array.from(new Set(products.filter(product => product.animal === selectedAnimal).map(product => product.race)));
    setSelectedAnimal(selectedAnimal);
    setSelectedRace('');
    setSelectedType('');
    setRaces(races);
    setTypes([]);
    setFilteredProducts(filterAndSortProducts(selectedAnimal, '', ''));
  };

  const handleRaceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedRace = event.target.value;
    const types = Array.from(new Set(products.filter(product => product.race === selectedRace).map(product => product.type)));
    setSelectedRace(selectedRace);
    setSelectedType('');
    setTypes(types);
    setFilteredProducts(filterAndSortProducts(selectedAnimal, selectedRace, ''));
  };

  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedType = event.target.value;
    setSelectedType(selectedType);
    setFilteredProducts(filterAndSortProducts(selectedAnimal, selectedRace, selectedType));
  };

  const filterAndSortProducts = (selectedAnimal: string, selectedRace: string, selectedType: string) => {
    let filteredProducts = products;

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

  return (
    <div className="container mt-5">
      <div className="row mb-4">
        <div className="col">
          <label htmlFor="animalFilter">Filtrar por Animal</label>
          <select id="animalFilter" className="form-control" value={selectedAnimal} onChange={handleAnimalChange}>
            <option value="">Selecione o Animal</option>
            <option value="Cachorro">Cachorro</option>
            <option value="Gato">Gato</option>
            <option value="Pássaro">Pássaro</option>
          </select>
        </div>
        <div className="col">
          <label htmlFor="raceFilter">Filtrar por Raça</label>
          <select id="raceFilter" className="form-control" value={selectedRace} onChange={handleRaceChange} disabled={!selectedAnimal}>
            <option value="">{selectedAnimal ? "Selecione a Raça" : "Selecione o Animal primeiro"}</option>
            {races.map(race => (
              <option key={race} value={race}>{race}</option>
            ))}
          </select>
        </div>
        <div className="col">
          <label htmlFor="typeFilter">Filtrar por Tipo</label>
          <select id="typeFilter" className="form-control" value={selectedType} onChange={handleTypeChange} disabled={!selectedRace}>
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

export default ProductFilter;
