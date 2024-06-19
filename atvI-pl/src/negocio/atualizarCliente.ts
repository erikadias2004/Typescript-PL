import Entrada from "../io/entrada";
import Cliente from "../modelo/cliente";
import RG from "../modelo/rg";

export default class AtualizarCliente {
    private clientes: Array<Cliente>;
    private entrada: Entrada;

    constructor(clientes: Array<Cliente>) {
        this.clientes = clientes;
        this.entrada = new Entrada();
    }

    public atualizar(): void {
        console.log(`\n--- Atualização de Dados do Cliente ---`);
        let cpf = this.entrada.receberTexto(`Informe o CPF do cliente: `);

        const cliente = this.clientes.find(cliente => cliente.getCpf.getValor === cpf);
        if (!cliente) {
            console.log(`Cliente não encontrado!`);
            return;
        }

        console.log(`\nCliente Encontrado: ${cliente.nome}`);

        let nomeSocial = this.entrada.receberTexto(`Novo nome social do cliente: `);
        cliente.nomeSocial = nomeSocial;

        let atualizarTelefone = this.entrada.receberTexto(`Atualizar telefone? (s/n): `);
        if (atualizarTelefone.toLowerCase() === 's') {
            cliente.getTelefones.forEach((telefone, index) => {
                console.log(`Telefone ${index + 1}: (${telefone.getDdd}) ${telefone.getNumero}`);
            });

            let indiceTelefone = this.entrada.receberNumero(`Número do telefone a atualizar (1, 2, 3...): `) - 1;
            if (indiceTelefone >= 0 && indiceTelefone < cliente.getTelefones.length) {
                let telefone = cliente.getTelefones[indiceTelefone];
                telefone.setDdd(this.entrada.receberTexto(`Novo DDD: `));
                telefone.setNumero(this.entrada.receberTexto(`Novo número: `));
            } else {
                console.log(`Telefone não encontrado.`);
            }
        }

        let adicionarRg = this.entrada.receberTexto(`Adicionar um novo RG? (s/n): `);
        if (adicionarRg.toLowerCase() === 's') {
            let valorRg = this.entrada.receberTexto(`Número do RG: `);
            let dataRg = this.entrada.receberTexto(`Data de emissão do RG (dd/mm/yyyy): `);
            let [diaRg, mesRg, anoRg] = dataRg.split('/').map(Number);
            let dataEmissaoRg = new Date(anoRg, mesRg - 1, diaRg);
            cliente.getRgs.push(new RG(valorRg, dataEmissaoRg));
        }

        console.log(`\nDados do cliente atualizados com sucesso!`);
    }
}
