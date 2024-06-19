import Servico from "../modelo/servico";
import Listagem from "./listagem";

export default class ListagemServicos extends Listagem {
    private servicos: Array<Servico>;

    constructor(servicos: Array<Servico>) {
        super();
        this.servicos = servicos;
    }

    public listar(): void {
        console.log(`\n--- Lista de Todos os Serviços ---`);
        this.servicos.forEach(servico => {
            console.log(`Nome: ${servico.nome}`);
            console.log(`Valor (R$): ${servico.preco}`);
            console.log(`--------------------------------------`);
        });
        console.log(`\n`);
    }
}
