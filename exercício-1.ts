// 1. Variáveis e exibição no console
let produto: string = 'Mouse';
let preco: number = 59.90;
let disponivel: boolean = true;

const statusDisponivel: string = disponivel ? 'Sim' : 'Não';
console.log(`Produto: ${produto} - Preço: R$${preco.toFixed(2)} - Disponível: ${statusDisponivel}`);

