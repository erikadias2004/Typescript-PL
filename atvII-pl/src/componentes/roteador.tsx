import { Component } from "react";
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

type state = {
    tela: string
}

export default class Roteador extends Component<{}, state>{
    constructor(props: {} | Readonly<{}>) {
        super(props)
        this.state = {
            tela: 'Clientes'
        }
        this.selecionarView = this.selecionarView.bind(this)
    }

    selecionarView(novaTela: string, evento: Event) {
        evento.preventDefault()
        console.log(novaTela);
        this.setState({
            tela: novaTela
        })
    }

    render() {
        let barraNavegacao = <BarraNavegacao seletorView={this.selecionarView} botoes={['Clientes', 'Pets', 'Serviços', 'Produtos', 'Consumo Cliente', 'Consumo Pet', 'Listagem', 'Cadastrar', 'Comprar']} />
        if (this.state.tela === 'Clientes') {
            return (
                <>
                    {barraNavegacao}
                    <ListaCliente />
                </>
            )
        } else if (this.state.tela === 'Pets') {
            return (
                <>
                    {barraNavegacao}
                    <ListaPet />
                </>
            )
        } else if (this.state.tela === 'Serviços') {
            return (
                <>
                    {barraNavegacao}
                    <ListaServico />
                </>
            )
    } else if (this.state.tela === 'Produtos') {
        return (
            <>
                {barraNavegacao}
                <ListaProduto  />
            </>
        )
    } else if (this.state.tela === 'Consumo Cliente') {
        return (
            <>
                {barraNavegacao}
                <TabelaConsumo  />
            </>
        )
    } else if (this.state.tela === 'Consumo Pet') {
        return (
            <>
                {barraNavegacao}
                <ConsumoPet  />
            </>
        )
    } else if (this.state.tela === 'Listagem') {
        return (
            <>
                {barraNavegacao}
                <Listagem  />
            </>
        )
    } else if (this.state.tela === 'Cadastrar') {
        return (
            <>
                {barraNavegacao}
                <Cadastrar  />
            </>
        )
    } else if (this.state.tela === 'Comprar') {
        return (
            <>
                {barraNavegacao}
                <Comprar  />
            </>
        )
    }
}
}