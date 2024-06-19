import Cliente from "../modelo/cliente";
import Servico from "../modelo/servico";

export default class ListagemServicoMaisConsumido {
    private servicos: Array<Servico>;
    private clientes: Array<Cliente>;

    constructor(servicos: Array<Servico>, clientes: Array<Cliente>) {
        this.servicos = servicos;
        this.clientes = clientes;
    }

    public listar(): void {
        console.log(`\n--- Serviços Mais Consumidos ---`);

        const servicosConsumidos: Record<string, { servico: Servico, quantidade: number }> = {};

        this.clientes.forEach(cliente => {
            cliente.getServicosConsumidos.forEach(servico => {
                if (!servicosConsumidos[servico.getNome]) {
                    servicosConsumidos[servico.getNome] = { servico, quantidade: 0 };
                }
                servicosConsumidos[servico.getNome].quantidade += 1;
            });
        });

        for (const key in servicosConsumidos) {
            const { servico, quantidade } = servicosConsumidos[key];
            console.log(`Nome do serviço: ${servico.getNome}`);
            console.log(`Quantidade: ${quantidade}`);
            console.log(`--------------------------------------`);
        }
    }
}
