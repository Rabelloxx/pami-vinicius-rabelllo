// 2. Array de cidades e função para listar
let cidades: string[] = ['São Paulo', 'Rio de Janeiro', 'Curitiba', 'Salvador', 'Belo Horizonte'];

function listarCidades(lista: string[]): void {
  lista.forEach(cidade => console.log(cidade));
}

listarCidades(cidades);