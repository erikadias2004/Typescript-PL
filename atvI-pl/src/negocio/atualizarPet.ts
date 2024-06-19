import Entrada from "../io/entrada";
import Cliente from "../modelo/cliente";
import Pet from "../modelo/pet";

export default class AtualizarPet {
    private clientes: Array<Cliente>;
    private entrada: Entrada;

    constructor(clientes: Array<Cliente>) {
        this.clientes = clientes;
        this.entrada = new Entrada();
    }

    public atualizar(): void {
        console.log(`\n--- Atualização de Dados do Pet ---`);
        let cpf = this.entrada.receberTexto(`Informe o CPF do tutor: `);

        const cliente = this.clientes.find(cliente => cliente.getCpf.getValor === cpf);
        if (!cliente) {
            console.log("CPF não encontrado.");
            return;
        }

        cliente.getPets.forEach((pet, index) => {
            console.log(`Pet ${index + 1}: ${pet.getNome}`);
        });

        let nomePet = this.entrada.receberTexto(`Nome do pet a atualizar: `);
        const pet = cliente.getPets.find(pet => pet.getNome === nomePet);
        if (!pet) {
            console.log("Nome do pet não encontrado.");
            return;
        }

        pet.setNome(this.entrada.receberTexto(`Novo nome do pet: `));

        if (this.entrada.receberTexto(`Salvar alterações? (s/n): `).toLowerCase() === 's') {
            console.log(`\nDados do pet atualizados com sucesso!`);
        } else {
            console.log(`\nAtualização cancelada.`);
        }
    }
}
