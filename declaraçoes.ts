//Declarações de variáveis
let nome: string = 'Vinicius';
let idade: number = 34;
let estaAtivo: boolean = true;

//Arrays
let numeros: number[] = [1, 2, 3, 4, 5];
let nomes: string[] = ['Leonardo', 'Bruno', 'Carlos'];
let misto: (string | number)[] = ['Leonardo', 25, 'Carlos', 30];
let misto2: Array<string | number> = ['Leonardo', 25, 'Carlos', 30];

//Tuplas
let pessoa: [string, number] = ['Maria', 30];

//Union Types
let id: number | string = 123;
id = 'ABC123';

//Interfaces - são usadas para definir estrutura de objetos
interface Usuario {
  nome: string;
  idade: number;
  email?: string;  // Opcional
}

//Utilizar elas fica assim:
let novo_usuario: Usuario = {
  nome: 'Amanda',
  idade: 18
};