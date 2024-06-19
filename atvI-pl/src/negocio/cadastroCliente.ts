import Entrada from "../io/entrada";
import Cliente from "../modelo/cliente";
import CPF from "../modelo/cpf";
import Cadastro from "./cadastro";
import RG from "../modelo/rg";
import Telefone from "../modelo/telefone";

export default class CadastroCliente extends Cadastro {
    private clientes: Array<Cliente>;
    private entrada: Entrada;

    constructor(clientes: Array<Cliente>) {
        super();
        this.clientes = clientes;
        this.entrada = new Entrada();
    }

    public cadastrar(): void {
        console.log(`\n--- Cadastro de Cliente ---`);

        let nome = this.entrada.receberTexto(`Informe o nome do cliente: `);
        let nomeSocial = this.entrada.receberTexto(`Informe o nome social do cliente: `);
        let valorCpf = this.entrada.receberTexto(`Informe o número do CPF: `);
        let dataCpf = this.entrada.receberTexto(`Informe a data de emissão do CPF (dd/mm/yyyy): `);

        let [dia, mes, ano] = dataCpf.split('/').map(Number);
        let dataEmissaoCpf = new Date(ano, mes - 1, dia);
        let cpf = new CPF(valorCpf, dataEmissaoCpf);

        let cliente = new Cliente(nome, nomeSocial, cpf);

        // Adicionar RGs
        while (this.entrada.receberTexto(`Deseja adicionar um RG? (s/n): `).toLowerCase() === 's') {
            let valorRg = this.entrada.receberTexto(`Informe o número do RG: `);
            let dataRg = this.entrada.receberTexto(`Informe a data de emissão do RG (dd/mm/yyyy): `);

            let [diaRg, mesRg, anoRg] = dataRg.split('/').map(Number);
            let dataEmissaoRg = new Date(anoRg, mesRg - 1, diaRg);
            let rg = new RG(valorRg, dataEmissaoRg);

            cliente.getRgs.push(rg);
        }

        // Adicionar telefones
        while (this.entrada.receberTexto(`Deseja adicionar um telefone? (s/n): `).toLowerCase() === 's') {
            let ddd = this.entrada.receberTexto(`Informe o DDD do telefone: `);
            let numero = this.entrada.receberTexto(`Informe o número do telefone: `);
            let telefone = new Telefone(ddd, numero);
            cliente.getTelefones.push(telefone);
        }

        this.clientes.push(cliente);
        console.log(`\nCliente cadastrado com sucesso!`);
    }
}
