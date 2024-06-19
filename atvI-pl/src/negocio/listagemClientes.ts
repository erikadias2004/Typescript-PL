import Cliente from "../modelo/cliente";
import Listagem from "./listagem";

export default class ListagemClientes extends Listagem {
    private clientes: Array<Cliente>;

    constructor(clientes: Array<Cliente>) {
        super();
        this.clientes = clientes;
    }

    public listar(): void {
        console.log(`\n--- Lista de Clientes ---`);
        this.clientes.forEach(cliente => {
            console.log(`Nome: ${cliente.nome}`);
            console.log(`Nome social: ${cliente.nomeSocial}`);
            console.log(`CPF: ${cliente.getCpf.getValor}`);
            console.log(`RGs:`);
            cliente.getRgs.forEach(rg => console.log(rg.getValor));
            console.log(`Telefones:`);
            cliente.getTelefones.forEach(telefone => {
                console.log(`(${telefone.getDdd}) ${telefone.getNumero}`);
            });
            console.log(`Data de cadastro: ${cliente.getDataCadastro.toLocaleDateString()}`);
            console.log(`--------------------------------------`);
        });
        console.log(`\nFim da lista de clientes.\n`);
    }
}
