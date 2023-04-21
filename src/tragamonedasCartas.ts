import { Jugador } from "./jugador";
import { Mazo } from "./mazo";
import { Tragamonedas } from "./tragamonedas";

export class TragamonedasCartas extends Tragamonedas {
    private guia: Mazo [];
    private tirada: number[][];
    private mazo:Mazo;

    public constructor (pJugador:Jugador,pNombre:string){
        super(pJugador,pNombre);
        this.guia= new Array ();
        this.tirada= new Array();
        this.mazo = new Mazo();
    }

    public reglamentoJuego():string[]{
        const reglamento: string[] = new Array;
        reglamento.push(`El juego consiste en conseguir cuatro cartas con el mismo numero`);
        reglamento.push(`Cada guia tiene 14 cartas, del 1 al 13 mas el comodin`);
        reglamento.push(`Son cuatro guias, y no van a salir dos cartas iguales en la misma guia`);
        reglamento.push(`Si salen cuatro cartas iguales en la misma linea obtendra veinticinco veces la apuesta`);
        reglamento.push(`si salen dispersas en distintas guias obtendras 5 veces la apuesta.\n`);
        return reglamento;
    }

    public cargarGuia():void{
        this.mazo.cargarMazo();
        let auxMazo:Mazo = new Mazo();
        for (let i:number=0;i<4;i++){
            auxMazo.setMazo(auxMazo.cargarPalo(i));
            this.guia.push(auxMazo);
        }
    }

    public setTirada():void {
        this.tirada=[];
        let indice : number;
        for (let i:number=0; i<4; i++){
            this.tirada[i]=[];
            for (let j:number=0; j<3; j++) {
                indice = Math.floor(Math.random()*14);                  
                if (this.tirada[i].includes(indice)){
                    j = j-1;
                } else {
                    this.tirada[i].push(indice);
                }
            }
        }

    }

    public mostrarEnPantalla():string[]{
        let aux:string[] = new Array;
        for (let i:number=0;i<4;i++){                   
            for (let j:number=0;j<3;j++){
                aux.push(`${this.guia[i].getMazo()[this.tirada[i][j]].getCartas()}`);
            }
        }
        return aux;
    }

    private verificarCuatroIguales():boolean{
        let condicion:boolean = false;
        let cantidad:number;
        for (let j:number =0;j<3;j++){
            cantidad=1;
            for (let i:number=1;i<4;i++){
                if (this.tirada[j][i]===this.tirada[j][0]){
                    cantidad=cantidad+1;
                }
            }
            if (cantidad===4){
                condicion=true;
            }
        }
        return condicion;
    }

    private verificarLinea():boolean{
        let condicion:boolean = false;
        for (let i:number =0;i<3;i++){
            if ((this.tirada[i][1]===this.tirada[i][0])&&(this.tirada[i][2]===this.tirada[i][0])&&(this.tirada[i][3]===this.tirada[i][0])){
                condicion=true;
            }
        }
        return condicion;
    }

    public calcularPremio():number{
        let premio:number=0;
        if (this.verificarCuatroIguales()===true){                             //Verifica que haya cuatro cartas iguales. Si hay cuatro iguales entrega 5 veces la apuesta
            premio=this.jugador.getApuesta()*5;
        } 
        if (this.verificarLinea()===true){                                     //Verifica que haya cuatro cartas iguales en linea. Si hay cuatro iguales entrega 25 veces la apuesta
            premio=premio*5;
        }
        return premio;                                                                                          // retorna el premio, si todas fallaron es 0;
    }

  
}