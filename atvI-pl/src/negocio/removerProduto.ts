import Entrada from "../io/entrada";
import Produto from "../modelo/produto";

export default class RemoverProduto {
    private produtos: Array<Produto>;
    private entrada: Entrada;

    constructor(produtos: Array<Produto>) {
        this.produtos = produtos;
        this.entrada = new Entrada();
    }

    public remover(): void {
        console.log(`\n--- Remoção de Produto ---`);
        let nomeProduto = this.entrada.receberTexto(`Informe o nome do produto que deseja remover: `);

        const index = this.produtos.findIndex(produto => produto.nome === nomeProduto);
        if (index === -1) {
            console.log(`Produto não encontrado.`);
            return;
        }

        const produto = this.produtos[index];
        let confirmacao = this.entrada.receberTexto(`Deseja remover o produto: ${produto.nome}? (S/N): `);

        if (confirmacao.toLowerCase() === 's') {
            this.produtos.splice(index, 1);
            console.log(`\nProduto removido com sucesso!`);
        } else if (confirmacao.toLowerCase() === 'n') {
            console.log(`\nRemoção cancelada.`);
        } else {
            console.log(`\nOpção inválida.`);
        }
    }
}

