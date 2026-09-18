// function multiplicadores () {
//     let n1 = 1;
//    let n2 = 2;
// }

//     console.log(n1 * n2);
//     + (soma) - (subtração)
//     * (multiplicação) / (divisão)
//     ^ (potência) % (sobra de divisão)

// multiplicadores();

// function multiplicacomparametros(v1,v2){
//     console.log(v1 , "x" , v2 , " = " , v1 * v2);
// }

// multiplicacomparametros(3,4);
// multiplicacomparametros(4,10);
// multiplicacomparametros(6,7);

// function EquacaoDeBurrinho(x,y,z) {
//    let resultado = (x + y) / z;
//    return resultado;
// }

// console.log(EquacaoDeBurrinho(2,3,5)) ;


const equacaoDeTontinho = (x,y,z,w) => {
    return (x+y)*(z+w) /2;
}
console.log("o resultado é:", equacaoDeTontinho(3,5,8,13))