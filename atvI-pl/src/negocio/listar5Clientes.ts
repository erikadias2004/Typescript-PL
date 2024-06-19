import Entrada from "../io/entrada";
import Cliente from "../modelo/cliente";
import Produto from "../modelo/produto";
import Servico from "../modelo/servico";
import Listagem from "./listagem";

export default class ListagemValorProdutosServicosPorCliente extends Listagem {
    private produtos: Array<Produto>;
    private servicos: Array<Servico>;
    private clientes: Array<Cliente>;
    private entrada: Entrada;

    constructor(produtos: Array<Produto>, servicos: Array<Servico>, clientes: Array<Cliente>) {
        super();
        this.produtos = produtos;
        this.servicos = servicos;
        this.clientes = clientes;
        this.entrada = new Entrada();
    }

    public listar(): void {
        console.log(`\n--- Top 5 Clientes que Mais Consumiram por Valor ---`);

        const clientesValor = this.clientes.map(cliente => {
            const valorProdutos = cliente.getProdutosConsumidos.reduce((total, produto) => total + produto.getPreco, 0);
            const valorServicos = cliente.getServicosConsumidos.reduce((total, servico) => total + servico.getPreco, 0);
            const valorTotal = valorProdutos + valorServicos;
            return { cliente, valorTotal };
        });

        const top5Clientes = clientesValor.sort((a, b) => b.valorTotal - a.valorTotal).slice(0, 5);

        top5Clientes.forEach(({ cliente, valorTotal }) => {
            console.log(`Cliente: ${cliente.nome}`);
            console.log(`CPF: ${cliente.getCpf.getValor}`);
            console.log(`Valor total consumido: R$ ${valorTotal.toFixed(2)}`);
            console.log(`--------------------------------------`);
        });

        console.log(`\n`);
    }
}
