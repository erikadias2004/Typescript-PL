import Entrada from "../io/entrada";
import Empresa from "../modelo/empresa";
import AtualizarCliente from "../negocio/atualizarCliente";
import AtualizarPet from "../negocio/atualizarPet";
import AtualizarProduto from "../negocio/atualizarProduto";
import AtualizarServicos from "../negocio/atualizarServico";
import CadastrarProdutos from "../negocio/cadastrarProduto";
import CadastrarServicos from "../negocio/cadastrarServico";
import CadastroCliente from "../negocio/cadastroCliente";
import CadastroPet from "../negocio/cadastroPet";
import ComprarProduto from "../negocio/comprarProduto";
import ContratarServico from "../negocio/contratarServico";
import ListagemClientes from "../negocio/listagemClientes";
import ListagemPets from "../negocio/listagemPet";
import ListagemProdutoPorCPF from "../negocio/listagemProdutoConsumido";
import ListagemServicoPorCPF from "../negocio/listagemServicoConsumido";
import Listagem10Clientes from "../negocio/listar10Clientes";
import ListagemValorProdutosServicosPorCliente from "../negocio/listar5Clientes";
import ListagemMaisConsumidos from "../negocio/listarMaisConsumidos";
import ListagemProdutos from "../negocio/listarProdutos";
import ListagemServicos from "../negocio/listarServico";
import RemoverCliente from "../negocio/removerCliente";
import RemoverPet from "../negocio/removerPet";
import RemoverProduto from "../negocio/removerProduto";
import RemoverServicos from "../negocio/removerServico";

console.log(`Bem-vindo ao melhor sistema de gerenciamento de pet shops e clínicas veterinarias`);

let empresa = new Empresa();
let execucao = true;

while (execucao) {
    console.log(`Opções:`);
    console.log(` `);
    console.log(`---------- Clientes ----------`);
    console.log(`1 - Cadastrar cliente`);
    console.log("2 - Atualizar cliente");
    console.log(`3 - Listar todos os clientes`);
    console.log("4 - Deletar cliente");
    console.log(` `);
    console.log(`---------- Pets ----------`);
    console.log(`5 - Cadastrar novo Pet`);
    console.log(`6 - Atualizar Dados do pet`);
    console.log('7 - Listar todos os pets');
    console.log(`8 - Deletar pet`);
    console.log(` `);
    console.log(`---------- Produtos ----------`);
    console.log(`9 - Cadastrar novo Produto`);
    console.log(`10 - Listar todos os Produtos`);
    console.log(`11 - Atualizar Dados do Produto`);
    console.log(`12 - Comprar produto`);
    console.log(`13 - Deletar Produto`);
    console.log(`14 - Listar produtos consumidos por cliente`);
    console.log(` `);
    console.log(`---------- Serviços ----------`);
    console.log(`15 - Cadastrar Serviço`);
    console.log(`16 - Listar todos os Serviços`);
    console.log(`17 - Atualizar Dados do Serviço`);
    console.log(`18 - Contratar serviço`);
    console.log(`19 - Listar serviços consumidos por cliente`);
    console.log(`20 - Deletar Serviço`);
    console.log(` `);
    console.log(`---------- Listagens ----------`);
    console.log(`21 - Listar os 5 clientes que mais consumiram produtos ou serviços por valor`);
    console.log(`22 - Listar os 10 clientes que mais consumiram produtos ou serviços por quantidade`);
    console.log(`23 - Listar os Serviços ou Produtos mais consumidos`);
    console.log(` `);
    console.log(`0 - Sair`);

    let entrada = new Entrada();
    let opcao = entrada.receberNumero(`Por favor, escolha uma opção: `);

    switch (opcao) {
        case 1:
            let cadastro = new CadastroCliente(empresa.getClientes);
            cadastro.cadastrar();
            break;
        case 2:
            let atualizarCliente = new AtualizarCliente(empresa.getClientes);
            atualizarCliente.atualizar();
            break;
        case 3:
            let listagem = new ListagemClientes(empresa.getClientes);
            listagem.listar();
            break;
        case 4:
            let removerCliente = new RemoverCliente(empresa.getClientes);
            removerCliente.remover();
            break;
        case 5:
            let cadastroPet = new CadastroPet(empresa.getClientes);
            cadastroPet.cadastrar();
            break;
        case 6:
            let atualizarPet = new AtualizarPet(empresa.getClientes);
            atualizarPet.atualizar();
            break;
        case 7:
            let listagemPets = new ListagemPets(empresa.getClientes);
            listagemPets.listar();
            break;
        case 8:
            let removerPet = new RemoverPet(empresa.getClientes);
            removerPet.remover();
            break;
        case 9:
            let cadastrarProdutos = new CadastrarProdutos(empresa.getProdutos);
            cadastrarProdutos.cadastrar();
            break;
        case 10:
            let listarProdutos = new ListagemProdutos(empresa.getProdutos);
            listarProdutos.listar();
            break;
        case 11:
            let atualizarProdutos = new AtualizarProduto(empresa.getProdutos);
            atualizarProdutos.atualizar();
            break;
        case 12:
            let comprarProduto = new ComprarProduto(empresa.getProdutos, empresa.getClientes);
            comprarProduto.comprar();
            break;
        case 13:
            let removerProdutos = new RemoverProduto(empresa.getProdutos);
            removerProdutos.remover();
            break;
        case 14:
            let listagemProdutosConsumidos = new ListagemProdutoPorCPF(empresa.getProdutos, empresa.getClientes);
            listagemProdutosConsumidos.listar();
            break;
        case 15:
            let cadastrarServico = new CadastrarServicos(empresa.getServicos);
            cadastrarServico.cadastrar();
            break;
        case 16:
            let listarServico = new ListagemServicos(empresa.getServicos);
            listarServico.listar();
            break;
        case 17:
            let atualizarServico = new AtualizarServicos(empresa.getServicos);
            atualizarServico.atualizar();
            break;
        case 18:
            let contratarServico = new ContratarServico(empresa.getServicos, empresa.getClientes);
            contratarServico.contratar();
            break;
        case 19:
            let listagemServicosConsumidos = new ListagemServicoPorCPF(empresa.getServicos, empresa.getClientes);
            listagemServicosConsumidos.listar();
            break;
        case 20:
            let removerServico = new RemoverServicos(empresa.getServicos);
            removerServico.remover();
            break;
        case 21:
            let listagem5Clientes = new ListagemValorProdutosServicosPorCliente(empresa.getProdutos, empresa.getServicos, empresa.getClientes);
            listagem5Clientes.listar();
            break;
        case 22:
            let listagem10Clientes = new Listagem10Clientes(empresa.getClientes);
            listagem10Clientes.listar();
            break;
        case 23:
            let listagemMaisConsumidos = new ListagemMaisConsumidos(empresa.getClientes, empresa.getProdutos, empresa.getServicos);
            listagemMaisConsumidos.listar();
            break;
        case 0:
            execucao = false;
            console.log(`Até mais`);
            break;
        default:
            console.log(`Operação não entendida :(`);
    }
}
