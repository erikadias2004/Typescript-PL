import Entrada from "../io/entrada";
import Servico from "../modelo/servico";

export default class RemoverServicos {
    private servicos: Array<Servico>;
    private entrada: Entrada;

    constructor(servicos: Array<Servico>) {
        this.servicos = servicos;
        this.entrada = new Entrada();
    }

    public remover(): void {
        console.log(`\n--- Remoção de Serviço ---`);
        let nomeServico = this.entrada.receberTexto(`Informe o nome do serviço que deseja remover: `);

        const index = this.servicos.findIndex(servico => servico.nome === nomeServico);
        if (index === -1) {
            console.log(`Serviço não encontrado.`);
            return;
        }

        const servico = this.servicos[index];
        let confirmacao = this.entrada.receberTexto(`Deseja remover o serviço: ${servico.nome}? (S/N): `);

        if (confirmacao.toLowerCase() === 's') {
            this.servicos.splice(index, 1);
            console.log(`\nServiço removido com sucesso!`);
        } else if (confirmacao.toLowerCase() === 'n') {
            console.log(`\nRemoção cancelada.`);
        } else {
            console.log(`\nOpção inválida.`);
        }
    }
}
