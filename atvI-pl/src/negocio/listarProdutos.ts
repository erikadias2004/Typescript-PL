import Produto from "../modelo/produto";
import Listagem from "./listagem";

export default class ListagemProdutos extends Listagem {
    private produtos: Array<Produto>;

    constructor(produtos: Array<Produto>) {
        super();
        this.produtos = produtos;
    }

    public listar(): void {
        console.log(`\n--- Lista de Todos os Produtos ---`);
        this.produtos.forEach(produto => {
            console.log(`Nome: ${produto.nome}`);
            console.log(`Valor (R$): ${produto.preco}`);
            console.log(`--------------------------------------`);
        });
        console.log(`\n`);
    }
}
