import React, { useState } from "react";
import BarraNavegacao from "./barraNavegacao";
import ListaCliente from "./listaClientes";
import ListaPet from "./listaPet";
import ListaServico from "./listaServiço";
import ListaProduto from "./listaProdutos";
import Listagem from "./listagem";
import Cadastrar from "./Cadastrar";
import TabelaConsumo from "./TabelaConsumo";
import Comprar from "./comprar";
import ConsumoPet from "./consumoPet";

const Roteador: React.FC = () => {
    const [tela, setTela] = useState<string>('Clientes');

    const selecionarView = (novaTela: string, evento: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        evento.preventDefault();
        console.log(novaTela);
        setTela(novaTela);
    };

    const barraNavegacao = <BarraNavegacao seletorView={selecionarView} botoes={['Clientes', 'Pets', 'Serviços', 'Produtos', 'Consumo Cliente', 'Consumo Pet', 'Listagem', 'Cadastrar', 'Comprar']} />;

    return (
        <>
            {barraNavegacao}
            {tela === 'Clientes' && <ListaCliente />}
            {tela === 'Pets' && <ListaPet />}
            {tela === 'Serviços' && <ListaServico />}
            {tela === 'Produtos' && <ListaProduto />}
            {tela === 'Consumo Cliente' && <TabelaConsumo />}
            {tela === 'Consumo Pet' && <ConsumoPet />}
            {tela === 'Listagem' && <Listagem />}
            {tela === 'Cadastrar' && <Cadastrar />}
            {tela === 'Comprar' && <Comprar />}
        </>
    );
};

export default Roteador;
