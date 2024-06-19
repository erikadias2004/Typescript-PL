import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TabelaCliente from './components/tabelaCliente';
import VisualizarCliente from './components/visualizarCliente';
import CadastrarCliente from './components/cadastrarCliente';
import EditarCliente from './components/editarCliente';

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<TabelaCliente />} />
          <Route path='/cadastrar' element={<CadastrarCliente />} />
          <Route path="/visualizar/:id" element={<VisualizarCliente />} />
          <Route path="/editar/:id" element={<EditarCliente />} />
        </Routes>
    </Router>
  );
}

export default App;
