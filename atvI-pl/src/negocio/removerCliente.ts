import Entrada from "../io/entrada";
import Cliente from "../modelo/cliente";

export default class RemoverCliente {
    private clientes: Array<Cliente>;
    private entrada: Entrada;

    constructor(clientes: Array<Cliente>) {
        this.clientes = clientes;
        this.entrada = new Entrada();
    }

    public remover(): void {
        console.log(`\n--- Remoção de Cliente ---`);
        let cpf = this.entrada.receberTexto(`Informe o CPF do cliente que deseja remover: `);

        const index = this.clientes.findIndex(cliente => cliente.getCpf.getValor === cpf);
        if (index === -1) {
            console.log(`Cliente não encontrado.`);
            return;
        }

        const cliente = this.clientes[index];
        let confirmacao = this.entrada.receberTexto(`Deseja remover o cliente: ${cliente.nome}? (S/N): `);

        if (confirmacao.toLowerCase() === 's') {
            this.clientes.splice(index, 1);
            console.log(`\nCliente removido com sucesso!`);
        } else if (confirmacao.toLowerCase() === 'n') {
            console.log(`\nRemoção cancelada.`);
        } else {
            console.log(`\nOpção inválida.`);
        }
    }
}
