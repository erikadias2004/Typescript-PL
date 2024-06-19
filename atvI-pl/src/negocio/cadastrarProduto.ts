import Entrada from "../io/entrada";
import Cadastro from "../negocio/cadastro";
import Produto from "../modelo/produto";

export default class CadastrarProdutos extends Cadastro {
    private produtos: Array<Produto>;
    private entrada: Entrada;

    constructor(produtos: Array<Produto>) {
        super();
        this.produtos = produtos;
        this.entrada = new Entrada();
    }

    public cadastrar(): void {
        console.log(`\n--- Cadastro de Produto ---`);

        let nomeProduto = this.entrada.receberTexto(`Informe o nome do produto: `);
        let valorProduto = this.entrada.receberNumero(`Informe o valor do produto (R$): `);

        let produto = new Produto(nomeProduto, valorProduto);

        let confirmacao = this.entrada.receberTexto(`Deseja cadastrar o produto ${nomeProduto} por R$ ${valorProduto}? (S/N): `);

        if (confirmacao.toLowerCase() === 's') {
            this.produtos.push(produto);
            console.log(`\nProduto cadastrado com sucesso!`);
        } else if (confirmacao.toLowerCase() === 'n') {
            console.log(`\nCadastro cancelado.`);
        } else {
            console.log(`\nOpção inválida.`);
        }
    }
}
