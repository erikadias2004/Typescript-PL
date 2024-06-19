import React, { useState, useEffect } from 'react';

interface Product {
  nome: string;
  animal: string;
  raca: string;
  tipo: string;
  quantidade: number;
}

interface Service {
  nome: string;
  animal: string;
  raca: string;
  tipo: string;
  quantidade: number;
}

const ProductFilter: React.FC = () => {
  const [selectedAnimal, setSelectedAnimal] = useState<string>('');
  const [selectedRace, setSelectedRace] = useState<string>('');
  const [selectedType, setSelectedType] = useState<string>('');
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [filteredServices, setFilteredServices] = useState<Service[]>([]);
  const [animals, setAnimals] = useState<string[]>([]);
  const [races, setRaces] = useState<string[]>([]);
  const [types, setTypes] = useState<string[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/produtos');
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data.sort((a: any, b: any) => b.quantidade - a.quantidade));
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      }
    };

    const fetchServices = async () => {
      try {
        const response = await fetch('http://localhost:5000/servicos');
        const data = await response.json();
        setServices(data);
        setFilteredServices(data.sort((a: any, b: any) => b.quantidade - a.quantidade));
      } catch (error) {
        console.error('Erro ao buscar serviços:', error);
      }
    };

    const fetchAnimals = async () => {
      try {
        const response = await fetch('http://localhost:5000/animais');
        const data = await response.json();
        setAnimals(data);
      } catch (error) {
        console.error('Erro ao buscar animais:', error);
      }
    };

    fetchProducts();
    fetchServices();
    fetchAnimals();
  }, []);

  const handleAnimalChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedAnimal = event.target.value;
    setSelectedAnimal(selectedAnimal);
    setSelectedRace('');
    setSelectedType('');
    setTypes([]);

    if (selectedAnimal) {
      try {
        const response = await fetch(`http://localhost:5000/racas?animal=${selectedAnimal}`);
        const data = await response.json();
        setRaces(data);
        setFilteredProducts(filterAndSortProducts(selectedAnimal, '', ''));
        setFilteredServices(filterAndSortServices(selectedAnimal, '', ''));
      } catch (error) {
        console.error('Erro ao buscar raças:', error);
      }
    } else {
      setRaces([]);
      setFilteredProducts(filterAndSortProducts('', '', ''));
      setFilteredServices(filterAndSortServices('', '', ''));
    }
  };

  const handleRaceChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedRace = event.target.value;
    setSelectedRace(selectedRace);
    setSelectedType('');

    if (selectedRace) {
      try {
        const response = await fetch(`http://localhost:5000/tipos?raca=${selectedRace}`);
        const data = await response.json();
        setTypes(data);
        setFilteredProducts(filterAndSortProducts(selectedAnimal, selectedRace, ''));
        setFilteredServices(filterAndSortServices(selectedAnimal, selectedRace, ''));
      } catch (error) {
        console.error('Erro ao buscar tipos:', error);
      }
    } else {
      setTypes([]);
      setFilteredProducts(filterAndSortProducts(selectedAnimal, '', ''));
      setFilteredServices(filterAndSortServices(selectedAnimal, '', ''));
    }
  };

  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedType = event.target.value;
    setSelectedType(selectedType);
    setFilteredProducts(filterAndSortProducts(selectedAnimal, selectedRace, selectedType));
    setFilteredServices(filterAndSortServices(selectedAnimal, selectedRace, selectedType));
  };

  const filterAndSortProducts = (selectedAnimal: string, selectedRace: string, selectedType: string) => {
    let filteredProducts = products;

    if (selectedAnimal) {
      filteredProducts = filteredProducts.filter(product => product.animal === selectedAnimal);
    }

    if (selectedRace) {
      filteredProducts = filteredProducts.filter(product => product.raca === selectedRace);
    }

    if (selectedType) {
      filteredProducts = filteredProducts.filter(product => product.tipo === selectedType);
    }

    return filteredProducts.sort((a, b) => b.quantidade - a.quantidade);
  };

  const filterAndSortServices = (selectedAnimal: string, selectedRace: string, selectedType: string) => {
    let filteredServices = services;

    if (selectedAnimal) {
      filteredServices = filteredServices.filter(service => service.animal === selectedAnimal);
    }

    if (selectedRace) {
      filteredServices = filteredServices.filter(service => service.raca === selectedRace);
    }

    if (selectedType) {
      filteredServices = filteredServices.filter(service => service.tipo === selectedType);
    }

    return filteredServices.sort((a, b) => b.quantidade - a.quantidade);
  };

  return (
    <div className="container mt-5">
      <div className="row mb-4">
        <div className="col">
          <label htmlFor="animalFilter">Filtrar por Animal</label>
          <select id="animalFilter" className="form-control" value={selectedAnimal} onChange={handleAnimalChange}>
            <option value="">Selecione o Animal</option>
            {animals.map(animal => (
              <option key={animal} value={animal}>{animal}</option>
            ))}
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

      <h3>Produtos</h3>
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
              <td>{product.nome}</td>
              {selectedAnimal && <td>{product.animal}</td>}
              {selectedRace && <td>{product.raca}</td>}
              {selectedType && <td>{product.tipo}</td>}
              <td>{product.quantidade}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 className="mt-5">Serviços</h3>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Serviço</th>
            {selectedAnimal && <th>Animal</th>}
            {selectedRace && <th>Raça</th>}
            {selectedType && <th>Tipo</th>}
            <th>Quantidade</th>
          </tr>
        </thead>
        <tbody>
          {filteredServices.map((service, index) => (
            <tr key={index}>
              <td>{service.nome}</td>
              {selectedAnimal && <td>{service.animal}</td>}
              {selectedRace && <td>{service.raca}</td>}
              {selectedType && <td>{service.tipo}</td>}
              <td>{service.quantidade}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductFilter;
