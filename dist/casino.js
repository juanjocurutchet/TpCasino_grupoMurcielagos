"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Casino = void 0;
const dados_1 = require("./dados");
const jugador_1 = require("./jugador");
const mayorOmenor_1 = require("./mayorOmenor");
const pantalla_1 = require("./pantalla");
const tragamonedasCartas_1 = require("./tragamonedasCartas");
const tragamonedasFrutas_1 = require("./tragamonedasFrutas");
const readlineSync = __importStar(require("readline-sync"));
class Casino {
    constructor() {
        this.nombreCasino = "LA VIRULETA";
    }
    getNombreCasino() {
        return this.nombreCasino;
    }
    setNombre(pNombreCasino) {
        this.nombreCasino = pNombreCasino;
    }
    inscripcion() {
        const pantalla = new pantalla_1.Pantalla([]);
        pantalla.borrarConsola();
        pantalla.bienvenido(this.nombreCasino);
        pantalla.pausaConsola();
        const nombreAinscribirse = readlineSync.question("Ingrese su nombre: ".toUpperCase());
        const dinero = readlineSync.questionInt("Ingrese la cantidad de fichas a comprar: ".toUpperCase());
        const jugador = new jugador_1.Jugador(nombreAinscribirse, dinero);
        jugador.jugar(pantalla);
        pantalla.borrarConsola();
        console.log(`Gracias ${jugador.getNombre()} por apostar en ${this.nombreCasino}`);
        console.log(`Puede canjear las ${jugador.getDinero()} fichas que gano`);
        console.log("Vuelva pronto");
    }
    //Creamos un menu para elegir el juego e instanciamos los juegos...
    fabrica(pIndice, pJugador, pPantalla) {
        let juego;
        switch (pIndice) {
            case 1:
                juego = new tragamonedasFrutas_1.TragamonedasFrutas(pJugador, "La fruta de la fortuna");
                juego.juego(pPantalla);
                break;
            case 2:
                juego = new tragamonedasCartas_1.TragamonedasCartas(pJugador, "Las cartas tienen magia");
                juego.juego(pPantalla);
                break;
            case 3:
                console.log("A las cartas, Mayor o Menor");
                juego = new mayorOmenor_1.MayorOmenor(pJugador, "A las cartas, Mayor o Menor");
                juego.juego(pPantalla);
                break;
            case 4:
                juego = new dados_1.Dados(pJugador, "Dados, dados y mas dados");
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
exports.Casino = Casino;
