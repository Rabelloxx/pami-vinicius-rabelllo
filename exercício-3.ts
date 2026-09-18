

// 3. Interface Livro, objeto fictício e função para exibir
interface Livro {
  titulo: string;
  autor: string;
  anoPublicacao: number;
}

let meuLivro: Livro = {
  titulo: 'Titio da Etec',
  autor: 'V.N.R ',
  anoPublicacao: 2026
};

function exibirLivro(livro: Livro): void {
  console.log(`Título: ${livro.titulo}`);
  console.log(`Autor: ${livro.autor}`);
  console.log(`Ano de Publicação: ${livro.anoPublicacao}`);
}

exibirLivro(meuLivro);