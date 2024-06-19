import Cliente from "../modelo/cliente";
import Listagem from "./listagem";

export default class ListagemPets extends Listagem {
    private clientes: Array<Cliente>;

    constructor(clientes: Array<Cliente>) {
        super();
        this.clientes = clientes;
    }

    public listar(): void {
        console.log(`\n--- Lista de Todos os Pets Cadastrados ---`);
        this.clientes.forEach(cliente => {
            if (cliente.getPets.length > 0) {
                console.log(`Tutor: ${cliente.nome}`);
                cliente.getPets.forEach(pet => {
                    console.log(`Nome do pet: ${pet.getNome}`);
                    console.log(`Raça: ${pet.getRaca}`);
                    console.log(`Gênero: ${pet.getGenero}`);
                    console.log(`Tipo: ${pet.getTipo}`);
                    console.log(`--------------------------------------`);
                });
            }
        });
        console.log(`\n`);
    }
}
