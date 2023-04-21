import { red } from "colors";
import { Jugador } from "./jugador";
import { Pantalla } from "./pantalla";
import * as readlineSync from 'readline-sync';

export class Dados{
    private dados: number[];
        private nombre: string;
        private jugador: Jugador;

        public constructor( jugador: Jugador, nombre: string) {

                this.dados = [];
                this.nombre = nombre;
                this.jugador = jugador;
        }

        public getdados(): number[] {
                return this.dados;
        }
        public setDados(pdados: number[]): void {
                this.dados = pdados;
        }

        public getNombreDados(): String {
                return this.nombre;
        }

        public setNombreDados(nombre: string): void {
                this.nombre = nombre;
        }

        private premioObtenido(): string {
                let premio: string = `Lo siento, no obtuviste ninguna combinación ganadora, su dinero actual es de ${this.jugador.getDinero()}`;
                if (this.verificarGenerala()) {
                        premio = `¡Felicidades, obtuviste Generala! Ganaste el premio Mayor; $ ${this.jugador.getApuesta() * 10}.`
                        this.jugador.setDinero(this.jugador.getDinero() + this.jugador.getApuesta() * 10);
                } else if (this.verificarEscalera()) {
                        premio = `¡Felicidades, Obtuviste escalera! Ganaste el cuarto premio, $ ${this.jugador.getApuesta() * 2}`
                        this.jugador.setDinero(this.jugador.getDinero() + this.jugador.getApuesta() * 2);
                } else if (this.verificarPoker()) {
                        premio = `¡Felicidades, obtuviste Poker! Ganaste el tercer premio, $ ${this.jugador.getApuesta() * 4}`
                        this.jugador.setDinero(this.jugador.getDinero() + this.jugador.getApuesta() * 4);
                } else if (this.verificarFull()) {
                        premio = `¡Obtuviste Full! Ganaste el segundo premio, $ ${this.jugador.getApuesta() * 8}`
                        this.jugador.setDinero(this.jugador.getDinero() + this.jugador.getApuesta() * 8);
                } else {
                        premio = `Lo siento, no obtuviste ninguna combinación ganadora, su dinero actual es de ${this.jugador.getDinero()}`;
                }
                return premio;
        }

        private reglamento():string[] {
            return [];
        }

       public jugar(pantalla:Pantalla): void {
            let strDados: string[] = new Array();
            let strPantalla:string[] = new Array();
            pantalla.borrarConsola();
            pantalla.bienvenido(this.nombre);
                do {
                        pantalla.borrarConsola();
                        strPantalla.push.apply(strPantalla,this.probabilidad());
                        strPantalla.push(`\n`)
                        strPantalla.push(`Su dinero actual es de $${this.jugador.getDinero()}\n`);
                        pantalla.setPantalla(strPantalla);
                        pantalla.mostrarMensaje();
                        strPantalla=[];
                        this.jugador.apostar(pantalla);
                        //                        console.log(this.probPremioMayor())
                        this.tirarDados();
                        strDados=[];
                        for (let i:number =0; i<5; i++){
                            strDados.push(`Dado ${i+1}: ${this.dados[i]}`)
                        }                        
                        pantalla.setPantalla(strDados);
                        pantalla.mostrarPantallaInicio(this.nombre);
                        pantalla.pausaConsola();                   
                        strPantalla.push(this.premioObtenido());
                        strPantalla.push(`\n`)
                        pantalla.setPantalla(strPantalla);
                        pantalla.mostrarMensaje();

                } while((this.jugador.getDinero()>0)&&(readlineSync.keyInYN("¿Desea jugar de nuevo? ")))

    

            }

            // Calculamos las probabilidades de ganar en cada combinacion...

            private calcularProbabilidadCuatroIguales(): number {
                // Para obtener cuatro números iguales en un solo tiro con cinco dados, hay dos posibilidades:
                // 1. Obtener cuatro dados con el mismo valor (por ejemplo, 1111).
                // 2. Obtener cinco dados con el mismo valor (por ejemplo, 22222).
                // En la primera posibilidad, hay 6 maneras de elegir el valor que se repetirá cuatro veces,
                // y 5 maneras de elegir cuál de los cuatro dados no tendrá ese valor.
                const numCombinacionesPrimeraPosibilidad = 6 * 5;
                // En la segunda posibilidad, hay 6 maneras de elegir el valor que se repetirá cinco veces.
                const numCombinacionesSegundaPosibilidad = 6;
                // El número total de combinaciones posibles de valores en 5 dados es 6^5 (7776).
                const numCombinacionesTotal = 6 ** 5;
                // La probabilidad de obtener cuatro números iguales en un solo tiro con cinco dados es la suma de las
                // probabilidades de las dos posibilidades.
                const probabilidad = Number(((numCombinacionesPrimeraPosibilidad + numCombinacionesSegundaPosibilidad) / numCombinacionesTotal*100).toFixed(3));
                return probabilidad;
              }
        private calcularProbabilidadEscalera(): number {
                // Para obtener una escalera en un solo tiro con cinco dados, hay dos posibilidades:
                // 1. Obtener la escalera 1-5 (12345) o la escalera 2-6 (23456).
                // 2. Obtener cualquier otra combinación de valores.
                // En la primera posibilidad, hay dos maneras de obtener la escalera (12345 o 23456).
                const numEscaleras = 2;
                // En la segunda posibilidad, hay 6^5 (7776) maneras de obtener cualquier combinación de valores.
                const numCombinacionesOtros = 6 ** 5;
                // El número total de combinaciones posibles de valores en 5 dados es 6^5 (7776).
                const numCombinacionesTotal = 6 ** 5;
                // La probabilidad de obtener una escalera en un solo tiro con cinco dados es la suma de las
                // probabilidades de las dos posibilidades.
                const probabilidad = Number(((numEscaleras + numCombinacionesOtros) / numCombinacionesTotal).toFixed(3));
                return probabilidad;
        }
        private calcularProbabilidadCincoIguales(): number {
            // Para obtener cinco números iguales en un solo tiro con cinco dados, hay 6 posibilidades:
            // obtener cinco dados con valor 1, 5 dados con valor 2, ..., o 5 dados con valor 6.
            // El número de combinaciones posibles que forman cinco números iguales es 6.
            const numCombinaciones = 6;
            // El número total de combinaciones posibles de valores en 5 dados es 6^5 (7776).
            const numCombinacionesTotal = 6 ** 5;
            // La probabilidad de obtener cinco números iguales en un solo tiro con cinco dados es el cociente entre
            // el número de combinaciones posibles que forman esta combinación y el número total de combinaciones posibles
            // de valores en 5 dados.
            const probabilidad = Number((numCombinaciones / numCombinacionesTotal*100).toFixed(3));
            return probabilidad;
        }
       

        private calcularProbabilidadTresDosIguales(): number {
            // Para obtener tres números iguales y otro dos iguales entre sí en un solo tiro con cinco dados,
            // hay una única posibilidad: obtener tres dados con el mismo valor y dos dados con otro valor igual
            // (por ejemplo, 11122).
            // Hay 6 maneras de elegir el valor que se repetirá tres veces,
            // y 5 maneras de elegir el valor que se repetirá dos veces.
            const numCombinaciones = 6 * 5;
            // El número total de combinaciones posibles de valores en 5 dados es 6^5 (7776).
            const numCombinacionesTotal = 6 ** 5;
            // La probabilidad de obtener tres números iguales y otro dos iguales entre sí en un solo tiro con cinco dados
            // es el cociente entre el número de combinaciones posibles que forman esta combinación y el número total de
            // combinaciones posibles de valores en 5 dados.
            const probabilidad = Number((numCombinaciones / numCombinacionesTotal*100).toFixed(3));
            return probabilidad;
          }
        private probabilidad(): string[] {
                const strProbabilidad=new Array ();
                strProbabilidad.push(`Su probabilidad de obtener generala es de ${red(`${this.calcularProbabilidadCincoIguales()}`)} %`);
                strProbabilidad.push(`Su probabilidad de obtener escalera es de ${red(`${this.calcularProbabilidadEscalera()}`)} %`);
                strProbabilidad.push(`Su probabilidad de obtener full es de ${red(`${this.calcularProbabilidadTresDosIguales()}`)} %`);
                strProbabilidad.push(`Su probabilidad de obtener poker es de ${red(`${this.calcularProbabilidadCuatroIguales()}`)} %`);
                return strProbabilidad;

        }

        // Cargamos el arreglo dados con cinco numeros aleatorios...

        private tirarDados(): void {
                this.dados=[];
                for (let i = 0; i < 5; i++) {
                        this.dados.push(Math.floor(Math.random() * 6) + 1);
                }
        }

        // Verificamos las distintas posibilidades de ganar...

        private verificarGenerala(): boolean {

                const primerElemento = this.dados[0];

                for (let i = 1; i < this.dados.length; i++) {

                        if (this.dados[i] !== primerElemento) {
                                return false;
                        }
                }

                return true;
        }

        
        verificarPoker(): boolean {
                for (let i = 0; i < this.dados.length; i++) {
                        const elemActual = this.dados[i];
                        let count = 0;
                        for (let j = 0; j < this.dados.length; j++) {
                                if (this.dados[j] === elemActual) {
                                        count++;
                                }
                                if (count === 4) {
                                        return true;
                                }
                        }
                }
                return false;
        }

        
        private verificarEscalera(): boolean {
                this.dados.sort((a, b) => a - b);
                for (let i = 1; i < this.dados.length; i++) {
                        if (this.dados[i] !== this.dados[i - 1] + 1) {
                                return false;
                        }
                }
                return true;
        }

        
        private verificarFull(): boolean {
            const numerosUnicos = this.dados.reduce((acumulador: number[], valor) => {
                    if (!acumulador.includes(valor)) {
                        acumulador.push(valor);
                    }
                    return acumulador;
                }, []);
              
                
                if (numerosUnicos.length === 2) {
                        const numRepetidos = this.dados.filter((num) => num === numerosUnicos[0]).length;
                        return numRepetidos === 2 || numRepetidos === 3;
                }
                return false;
        }
}

