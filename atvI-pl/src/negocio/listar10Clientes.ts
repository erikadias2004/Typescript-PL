import Cliente from "../modelo/cliente";
import Listagem from "./listagem";

export default class Listagem10Clientes extends Listagem {
    private clientes: Array<Cliente>;

    constructor(clientes: Array<Cliente>) {
        super();
        this.clientes = clientes;
    }

    public listar(): void {
        console.log(`\n--- Top 10 Clientes que Mais Consumiram ---`);

        const clientesConsumo = this.clientes.map(cliente => ({
            nome: cliente.nome,
            quantidade: cliente.getProdutosConsumidos.length + cliente.getServicosConsumidos.length,
            cpf: cliente.getCpf.getValor
        }));

        const top10Clientes = clientesConsumo.sort((a, b) => b.quantidade - a.quantidade).slice(0, 10);

        top10Clientes.forEach(cliente => {
            console.log(`Nome: ${cliente.nome}`);
            console.log(`Quantidade: ${cliente.quantidade}`);
            console.log(`CPF: ${cliente.cpf}`);
            console.log(`--------------------------------------`);
        });
    }
}
