import Entrada from "../io/entrada";
import Cliente from "../modelo/cliente";
import Produto from "../modelo/produto";

export default class ComprarProduto {
    private produtos: Array<Produto>;
    private clientes: Array<Cliente>;
    private entrada: Entrada;

    constructor(produtos: Array<Produto>, clientes: Array<Cliente>) {
        this.produtos = produtos;
        this.clientes = clientes;
        this.entrada = new Entrada();
    }

    public comprar(): void {
        console.log(`\n--- Compra de Produto ---`);

        let cpf = this.entrada.receberTexto(`Informe o CPF do cliente: `);
        let cliente = this.clientes.find(cliente => cliente.getCpf.getValor === cpf);

        if (!cliente) {
            console.log(`Cliente não encontrado.`);
            return;
        }

        let nomeProduto = this.entrada.receberTexto(`Informe o nome do produto: `);
        let produto = this.produtos.find(produto => produto.getNome === nomeProduto);

        if (!produto) {
            console.log(`Produto não encontrado.`);
            return;
        }

        let quantidade = this.entrada.receberNumero(`Informe a quantidade a ser comprada: `);
        cliente.adicionarProdutoConsumido(produto, quantidade);
        console.log(`\nCompra realizada com sucesso!`);
    }
}
