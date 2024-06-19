import Entrada from "../io/entrada";
import Servico from "../modelo/servico";

export default class AtualizarServicos {
    private servicos: Array<Servico>;
    private entrada: Entrada;

    constructor(servicos: Array<Servico>) {
        this.servicos = servicos;
        this.entrada = new Entrada();
    }

    public atualizar(): void {
        console.log(`\n--- Atualização de Dados do Serviço ---`);
        let nomeServico = this.entrada.receberTexto(`Nome do serviço: `);

        const servico = this.servicos.find(servico => servico.nome === nomeServico);
        if (!servico) {
            console.log(`Serviço não encontrado!`);
            return;
        }

        console.log(`\nServiço Encontrado: ${servico.nome}`);

        servico.nome = this.entrada.receberTexto(`Novo nome do serviço: `);
        servico.preco = this.entrada.receberNumero(`Novo preço do serviço (R$): `);

        console.log(`\nDados do serviço atualizados com sucesso!`);
    }
}
