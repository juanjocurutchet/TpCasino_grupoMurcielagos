import { Dados } from "./dados";
import { Jugador } from "./jugador";
import { MayorOmenor } from "./mayorOmenor";
import { Pantalla } from "./pantalla";
import { TragamonedasCartas } from "./tragamonedasCartas";
import { TragamonedasFrutas } from "./tragamonedasFrutas";
import * as readlineSync from 'readline-sync';

export class Casino{
    private nombreCasino:string;
    

    public constructor(){
        this.nombreCasino="LA VIRULETA";
                
    }
    

    public getNombreCasino():string {
        return this.nombreCasino
    }
    public setNombre(pNombreCasino:string):void{
        this.nombreCasino=pNombreCasino;
    }  

    
    public inscripcion():void {
        const pantalla = new Pantalla([]);
        pantalla.borrarConsola();
        pantalla.bienvenido(this.nombreCasino);
        pantalla.pausaConsola();
        const nombreAinscribirse = readlineSync.question("Ingrese su nombre: ".toUpperCase());
        const dinero = readlineSync.questionInt("Ingrese la cantidad de fichas a comprar: ".toUpperCase());
        const jugador= new Jugador(nombreAinscribirse,dinero);
        jugador.jugar(pantalla);
        pantalla.borrarConsola();
        console.log(`Gracias ${jugador.getNombre()} por apostar en ${this.nombreCasino}`);
        console.log(`Puede canjear las ${jugador.getDinero()} fichas que gano`);
        console.log("Vuelva pronto");    
    }

    //Creamos un menu para elegir el juego e instanciamos los juegos...

    public fabrica(pIndice:number, pJugador:Jugador, pPantalla:Pantalla):void{
        let juego;
        switch (pIndice) {
        case 1: 
            juego = new TragamonedasFrutas(pJugador,"La fruta de la fortuna"); 
            juego.juego(pPantalla);       
            break;
        case 2:
            juego = new TragamonedasCartas(pJugador,"Las cartas tienen magia"); 
            juego.juego(pPantalla); 
            break;
        case 3:
            console.log("A las cartas, Mayor o Menor");
            juego = new MayorOmenor(pJugador,"A las cartas, Mayor o Menor"); 
            juego.juego(pPantalla); 
            break;
        case 4:
            juego = new Dados(pJugador,"Dados, dados y mas dados"); 
            juego.jugar(pPantalla);
            break;
        case 0:
            console.log("Gracias por sumarte al casino");
            break;
        default:
            console.log("No pertence a este casino");
        }
        

    }

    
    



}
