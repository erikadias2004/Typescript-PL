import Entrada from "../io/entrada";
import Produto from "../modelo/produto";

export default class AtualizarProduto {
    private produtos: Array<Produto>;
    private entrada: Entrada;

    constructor(produtos: Array<Produto>) {
        this.produtos = produtos;
        this.entrada = new Entrada();
    }

    public atualizar(): void {
        console.log(`\n--- Atualização de Dados do Produto ---`);
        let nomeProduto = this.entrada.receberTexto(`Nome do produto: `);

        const produto = this.produtos.find(produto => produto.nome === nomeProduto);
        if (!produto) {
            console.log(`Produto não encontrado!`);
            return;
        }

        console.log(`\nProduto Encontrado: ${produto.nome}`);

        produto.nome = this.entrada.receberTexto(`Novo nome do produto: `);
        produto.preco = this.entrada.receberNumero(`Novo preço do produto (R$): `);

        console.log(`\nDados do produto atualizados com sucesso!`);
    }
}
