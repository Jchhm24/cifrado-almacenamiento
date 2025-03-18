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
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const readline = __importStar(require("readline"));
const encryptMessage_1 = require("./src/helper/encryptMessage");
const bruteForceAttack_1 = require("./src/helper/bruteForceAttack");
// Creamos una interfaz de lectura para leer la entrada del usuario
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
// Función para mostrar el menú principal
const showMenu = () => {
    console.clear();
    console.log("\n=== Menú Principal ===");
    console.log("1. Encriptar nuevo mensaje");
    console.log("2. Encriptar mensaje con clave personalizada");
    console.log("3. Desencriptar mensaje");
    console.log("4. Ver mensajes almacenados");
    console.log("5. Ataques de fuerza bruta");
    console.log("6. Salir");
    rl.question("Seleccione una opción: ", handleMenuOption);
};
// Manejador de opciones del menú
const handleMenuOption = (option) => {
    switch (option) {
        case "1":
            rl.question("Por favor, escribe un texto: ", (texto) => {
                console.log("Has escrito:", texto);
                const hashedMessage = (0, encryptMessage_1.encryptMessage)(texto);
                console.log("Mensaje encriptado:", hashedMessage);
                rl.question("\nPresiona Enter para volver al menú principal...", () => {
                    showMenu();
                });
            });
            break;
        case "2":
            rl.question("Por favor, escribe un texto: ", (texto) => {
                rl.question("Ingresa tu clave secreta: ", (clave) => {
                    console.log("Has escrito:", texto);
                    const hashedMessage = (0, encryptMessage_1.encryptMessage)(texto, clave);
                    console.log("Mensaje encriptado:", hashedMessage);
                    console.log("Clave secreta:", clave);
                    rl.question("\nPresiona Enter para volver al menú principal...", () => {
                        showMenu();
                    });
                });
            });
            break;
        case "3":
            rl.question("Ingresa el mensaje encriptado: ", (hashedMessage) => {
                rl.question("Ingresa la clave secreta: ", (clave) => {
                    const originalMessage = (0, encryptMessage_1.decryptMessage)(hashedMessage, clave);
                    if (originalMessage) {
                        console.log("Mensaje original:", originalMessage);
                    }
                    else {
                        console.log("Error: Clave incorrecta o mensaje no encontrado");
                    }
                    rl.question("\nPresiona Enter para volver al menú principal...", () => {
                        showMenu();
                    });
                });
            });
            break;
        case "4":
            const messages = (0, encryptMessage_1.getStoredMessages)();
            console.log("\n=== Mensajes Almacenados ===");
            messages.forEach((msg, index) => {
                console.log(`\nMensaje ${index + 1}:`);
                console.log("Mensaje encriptado:", msg.message);
                console.log("Clave:", msg.key);
                console.log("Fecha:", new Date(msg.timestamp).toLocaleString());
            });
            rl.question("\nPresiona Enter para volver al menú principal...", () => {
                showMenu();
            });
            break;
        case "5":
            const storedMessages = (0, encryptMessage_1.getStoredMessages)();
            if (storedMessages.length === 0) {
                console.log("\n¡No hay mensajes almacenados para atacar!");
                rl.question("\nPresiona Enter para volver al menú principal...", () => {
                    showMenu();
                });
                break;
            }
            console.log("\n=== Mensajes Disponibles para Atacar ===");
            storedMessages.forEach((msg, index) => {
                console.log(`\n${index + 1}. Mensaje encriptado: ${msg.message}`);
                console.log(`   Fecha: ${new Date(msg.timestamp).toLocaleString()}`);
            });
            rl.question("\nSeleccione el número del mensaje a atacar (o 0 para volver): ", (selection) => {
                const selectedIndex = parseInt(selection) - 1;
                if (selection === "0" ||
                    isNaN(selectedIndex) ||
                    selectedIndex < 0 ||
                    selectedIndex >= storedMessages.length) {
                    console.log("Volviendo al menú principal...");
                    showMenu();
                    return;
                }
                const targetMessage = storedMessages[selectedIndex];
                console.log("\nIniciando ataque de fuerza bruta...");
                const result = (0, bruteForceAttack_1.bruteForceAttack)(targetMessage.message);
                if (result.success) {
                    console.log("\n¡Ataque exitoso!");
                    console.log(`Mensaje original: ${result.message}`);
                    console.log(`Contraseña encontrada: ${result.key}`);
                }
                else {
                    console.log("\nNo se pudo descifrar el mensaje con el diccionario actual.");
                }
                console.log(`\nEstadísticas del ataque:`);
                console.log(`- Intentos realizados: ${result.attempts}`);
                console.log(`- Tiempo total: ${result.timeTaken.toFixed(2)} segundos`);
                rl.question("\nPresiona Enter para volver al menú principal...", () => {
                    showMenu();
                });
            });
            break;
        case "6":
            console.log("¡Hasta luego!");
            rl.close();
            break;
        default:
            console.log("Opción no válida. Por favor, intente de nuevo.");
            showMenu();
    }
};
// Iniciamos el programa mostrando el menú
showMenu();
