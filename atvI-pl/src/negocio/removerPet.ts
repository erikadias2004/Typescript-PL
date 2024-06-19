import Entrada from "../io/entrada";
import Cliente from "../modelo/cliente";

export default class RemoverPet {
    private clientes: Array<Cliente>;
    private entrada: Entrada;

    constructor(clientes: Array<Cliente>) {
        this.clientes = clientes;
        this.entrada = new Entrada();
    }

    public remover(): void {
        console.log(`\n--- Remoção de Pet ---`);

        let cpf = this.entrada.receberTexto(`Informe o CPF do tutor do pet que deseja remover: `);

        const cliente = this.clientes.find(cliente => cliente.getCpf.getValor === cpf);
        if (!cliente) {
            console.log(`Cliente não encontrado.`);
            return;
        }

        cliente.getPets.forEach((pet, index) => {
            console.log(`Pet ${index + 1}: ${pet.getNome}`);
        });

        let nomePet = this.entrada.receberTexto(`Informe o nome do pet que deseja remover: `);
        const indexPet = cliente.getPets.findIndex(pet => pet.getNome === nomePet);

        if (indexPet === -1) {
            console.log(`Pet não encontrado.`);
            return;
        }

        let confirmacao = this.entrada.receberTexto(`Deseja remover o pet ${nomePet}? (S/N): `);

        if (confirmacao.toLowerCase() === 's') {
            cliente.getPets.splice(indexPet, 1);
            console.log(`\nPet removido com sucesso!`);
        } else if (confirmacao.toLowerCase() === 'n') {
            console.log(`\nRemoção cancelada.`);
        } else {
            console.log(`\nOpção inválida.`);
        }
    }
}
