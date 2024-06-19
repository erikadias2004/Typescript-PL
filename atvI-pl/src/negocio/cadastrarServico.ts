import Entrada from "../io/entrada";
import Cadastro from "../negocio/cadastro";
import Servico from "../modelo/servico";

export default class CadastrarServicos extends Cadastro {
    private servicos: Array<Servico>;
    private entrada: Entrada;

    constructor(servicos: Array<Servico>) {
        super();
        this.servicos = servicos;
        this.entrada = new Entrada();
    }

    public cadastrar(): void {
        console.log(`\n--- Cadastro de Serviço ---`);

        let nomeServico = this.entrada.receberTexto(`Informe o nome do serviço: `);
        let valorServico = this.entrada.receberNumero(`Informe o valor do serviço (R$): `);

        let servico = new Servico(nomeServico, valorServico);

        let confirmacao = this.entrada.receberTexto(`Deseja cadastrar o serviço ${nomeServico} por R$ ${valorServico}? (S/N): `);

        if (confirmacao.toLowerCase() === 's') {
            this.servicos.push(servico);
            console.log(`\nServiço cadastrado com sucesso!`);
        } else if (confirmacao.toLowerCase() === 'n') {
            console.log(`\nCadastro cancelado.`);
        } else {
            console.log(`\nOpção inválida.`);
        }
    }
}
