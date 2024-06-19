import Entrada from "../io/entrada";
import Cliente from "../modelo/cliente";
import Servico from "../modelo/servico";

export default class ContratarServico {
    private servicos: Array<Servico>;
    private clientes: Array<Cliente>;
    private entrada: Entrada;

    constructor(servicos: Array<Servico>, clientes: Array<Cliente>) {
        this.servicos = servicos;
        this.clientes = clientes;
        this.entrada = new Entrada();
    }

    public contratar(): void {
        console.log(`\n--- Contratação de Serviço ---`);

        let cpf = this.entrada.receberTexto(`Informe o CPF do cliente: `);
        let cliente = this.clientes.find(cliente => cliente.getCpf.getValor === cpf);

        if (!cliente) {
            console.log(`Cliente não encontrado.`);
            return;
        }

        let nomeServico = this.entrada.receberTexto(`Informe o nome do serviço: `);
        let servico = this.servicos.find(servico => servico.getNome === nomeServico);

        if (!servico) {
            console.log(`Serviço não encontrado.`);
            return;
        }

        let quantidade = this.entrada.receberNumero(`Informe a quantidade a ser contratada: `);
        cliente.adicionarServicoConsumido(servico, quantidade);
        console.log(`\nServiço contratado com sucesso!`);
    }
}
