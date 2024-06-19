import Entrada from "../io/entrada";
import Cliente from "../modelo/cliente";
import Cadastro from "./cadastro";
import Pet from "../modelo/pet";

export default class CadastroPet extends Cadastro {
    private clientes: Array<Cliente>;
    private entrada: Entrada;

    constructor(clientes: Array<Cliente>) {
        super();
        this.clientes = clientes;
        this.entrada = new Entrada();
    }

    public cadastrar(): void {
        console.log(`\n--- Cadastro de Pet ---`);

        let nomePet = this.entrada.receberTexto(`Informe o nome do pet: `);
        let raca = this.entrada.receberTexto(`Informe a raça do pet: `);
        let genero = this.entrada.receberTexto(`Informe o gênero do pet: `);
        let tipo = this.entrada.receberTexto(`Informe o tipo do pet: `);

        let pet = new Pet(nomePet, raca, genero, tipo);

        let cpfTutor = this.entrada.receberTexto(`Informe o CPF do tutor do pet: `);

        const cliente = this.clientes.find(cliente => cliente.getCpf.getValor === cpfTutor);

        if (!cliente) {
            console.log(`Cliente não encontrado.`);
            return;
        }

        let confirmacao = this.entrada.receberTexto(`Deseja cadastrar o pet ${nomePet} para o tutor ${cliente.nome}? (S/N): `);

        if (confirmacao.toLowerCase() === 's') {
            cliente.getPets.push(pet);
            console.log(`\nPet cadastrado com sucesso!`);
        } else if (confirmacao.toLowerCase() === 'n') {
            console.log(`\nCadastro cancelado.`);
        } else {
            console.log(`\nOpção inválida.`);
        }
    }
}
