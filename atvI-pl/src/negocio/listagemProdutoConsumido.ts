import Entrada from "../io/entrada";
import Cliente from "../modelo/cliente";
import Produto from "../modelo/produto";

export default class ListagemProdutoPorCPF {
    private produtos: Array<Produto>;
    private clientes: Array<Cliente>;
    private entrada: Entrada;

    constructor(produtos: Array<Produto>, clientes: Array<Cliente>) {
        this.produtos = produtos;
        this.clientes = clientes;
        this.entrada = new Entrada();
    }

    public listar(): void {
        console.log(`\n--- Listagem de Produtos Consumidos pelo CPF ---`);

        let cpf = this.entrada.receberTexto(`Informe o seu CPF: `);
        const cliente = this.clientes.find(cliente => cliente.getCpf.getValor === cpf);

        if (cliente) {
            const produtosConsumidos = cliente.getProdutosConsumidos;
            if (produtosConsumidos.length === 0) {
                console.log("Nenhum produto encontrado.");
            } else {
                const produtosAgrupados: Record<string, { produto: Produto, quantidade: number }> = {};

                produtosConsumidos.forEach(produto => {
                    if (!produtosAgrupados[produto.getNome]) {
                        produtosAgrupados[produto.getNome] = { produto, quantidade: 0 };
                    }
                    produtosAgrupados[produto.getNome].quantidade += 1;
                });

                let valorTotal = 0;
                for (const key in produtosAgrupados) {
                    const { produto, quantidade } = produtosAgrupados[key];
                    console.log(`Nome do produto: ${produto.getNome}`);
                    console.log(`Quantidade: ${quantidade}`);
                    console.log(`Valor total do produto: R$ ${(produto.getPreco * quantidade).toFixed(2)}`);
                    console.log(`--------------------------------------`);
                    valorTotal += produto.getPreco * quantidade;
                }
                console.log(`Valor total dos produtos consumidos: R$ ${valorTotal.toFixed(2)}`);
            }
        } else {
            console.log("Cliente não encontrado.");
        }
    }
}
