import Entrada from "../io/entrada";
import Cliente from "../modelo/cliente";
import Produto from "../modelo/produto";
import Servico from "../modelo/servico";

export default class ListagemConsumoPorRacaETipo {
    private produtos: Array<Produto>;
    private servicos: Array<Servico>;
    private clientes: Array<Cliente>;
    private entrada: Entrada;

    constructor(produtos: Array<Produto>, servicos: Array<Servico>, clientes: Array<Cliente>) {
        this.produtos = produtos;
        this.servicos = servicos;
        this.clientes = clientes;
        this.entrada = new Entrada();
    }

    public listar(): void {
        console.log(`\n--- Consumo por Raça e Tipo de Pet ---`);

        const consumoPorPet: Record<string, { produtos: Record<string, { produto: Produto, quantidade: number }>, servicos: Record<string, { servico: Servico, quantidade: number }> }> = {};

        this.clientes.forEach(cliente => {
            cliente.getPets.forEach(pet => {
                const chavePet = `${pet.getTipo}-${pet.getRaca}`;

                if (!consumoPorPet[chavePet]) {
                    consumoPorPet[chavePet] = { produtos: {}, servicos: {} };
                }

                cliente.getProdutosConsumidos.forEach(produto => {
                    const nomeProduto = produto.getNome;
                    if (!consumoPorPet[chavePet].produtos[nomeProduto]) {
                        consumoPorPet[chavePet].produtos[nomeProduto] = { produto, quantidade: 0 };
                    }
                    consumoPorPet[chavePet].produtos[nomeProduto].quantidade += 1;
                });

                cliente.getServicosConsumidos.forEach(servico => {
                    const nomeServico = servico.getNome;
                    if (!consumoPorPet[chavePet].servicos[nomeServico]) {
                        consumoPorPet[chavePet].servicos[nomeServico] = { servico, quantidade: 0 };
                    }
                    consumoPorPet[chavePet].servicos[nomeServico].quantidade += 1;
                });
            });
        });

        for (const chavePet in consumoPorPet) {
            console.log(`\nTipo e Raça do Pet: ${chavePet}`);

            console.log(`\nProdutos consumidos:`);
            for (const key in consumoPorPet[chavePet].produtos) {
                const { produto, quantidade } = consumoPorPet[chavePet].produtos[key];
                console.log(`Nome do produto: ${produto.getNome}`);
                console.log(`Quantidade: ${quantidade}`);
                console.log(`--------------------------------------`);
            }

            console.log(`\nServiços consumidos:`);
            for (const key in consumoPorPet[chavePet].servicos) {
                const { servico, quantidade } = consumoPorPet[chavePet].servicos[key];
                console.log(`Nome do serviço: ${servico.getNome}`);
                console.log(`Quantidade: ${quantidade}`);
                console.log(`--------------------------------------`);
            }
        }
    }
}
