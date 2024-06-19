import Cliente from "../modelo/cliente";
import Produto from "../modelo/produto";
import Servico from "../modelo/servico";
import Listagem from "./listagem";

export default class ListagemMaisConsumidos extends Listagem {
    private clientes: Array<Cliente>;
    private produtos: Array<Produto>;
    private servicos: Array<Servico>;

    constructor(clientes: Array<Cliente>, produtos: Array<Produto>, servicos: Array<Servico>) {
        super();
        this.clientes = clientes;
        this.produtos = produtos;
        this.servicos = servicos;
    }

    public listar(): void {
        const minRequired = 5;

        if (this.clientes.length < minRequired) {
            console.log(`Não há clientes suficientes cadastrados.`);
            return;
        }

        if (this.produtos.length < minRequired) {
            console.log(`Não há produtos suficientes cadastrados.`);
            return;
        }

        if (this.servicos.length < minRequired) {
            console.log(`Não há serviços suficientes cadastrados.`);
            return;
        }

        const sortedProdutos = [...this.produtos].sort((a, b) => b.getQuantidadeConsumida - a.getQuantidadeConsumida);
        const sortedServicos = [...this.servicos].sort((a, b) => b.getQuantidadeConsumida - a.getQuantidadeConsumida);

        console.log(`\n--- Produtos Mais Consumidos ---`);
        sortedProdutos.slice(0, 5).forEach((produto, index) => {
            console.log(`${index + 1} - ${produto.getNome} - ${produto.getQuantidadeConsumida} unidades`);
        });

        console.log(`\n--- Serviços Mais Consumidos ---`);
        sortedServicos.slice(0, 5).forEach((servico, index) => {
            console.log(`${index + 1} - ${servico.getNome} - ${servico.getQuantidadeConsumida} unidades`);
        });
    }
}
