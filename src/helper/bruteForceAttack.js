"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.demonstrateBruteForce = exports.bruteForceAttack = void 0;
const encryptMessage_1 = require("./encryptMessage");
// Diccionario de contraseñas comunes para probar
const commonPasswords = [
    "password",
    "123456",
    "qwerty",
    "admin",
    "welcome",
    "letmein",
    "monkey",
    "dragon",
    "baseball",
    "football",
    "secret",
    "abc123",
    "pizza",
    // Agregar más contraseñas comunes según sea necesario
];
const bruteForceAttack = (hashedMessage) => {
    console.log("Iniciando ataque de fuerza bruta...");
    const startTime = Date.now();
    let attempts = 0;
    for (const password of commonPasswords) {
        attempts++;
        console.log(`Intento ${attempts}: Probando contraseña: ${password}`);
        const decrypted = (0, encryptMessage_1.decryptMessage)(hashedMessage, password);
        if (decrypted) {
            const endTime = Date.now();
            const timeTaken = (endTime - startTime) / 1000; // Convert to seconds
            console.log("\n¡Éxito! ¡Mensaje descifrado!");
            console.log(`Contraseña encontrada: ${password}`);
            console.log(`Mensaje descifrado: ${decrypted}`);
            console.log(`Intentos realizados: ${attempts}`);
            console.log(`Tiempo tomado: ${timeTaken} segundos`);
            return {
                success: true,
                key: password,
                message: decrypted,
                attempts,
                timeTaken,
            };
        }
    }
    const endTime = Date.now();
    const timeTaken = (endTime - startTime) / 1000;
    console.log("\n¡Ataque fallido!");
    console.log(`Intentos realizados: ${attempts}`);
    console.log(`Tiempo tomado: ${timeTaken} segundos`);
    return {
        success: false,
        attempts,
        timeTaken,
    };
};
exports.bruteForceAttack = bruteForceAttack;
// Función para demostrar el ataque
const demonstrateBruteForce = () => {
    const messages = (0, encryptMessage_1.getStoredMessages)();
    if (messages.length === 0) {
        console.log("¡No se encontraron mensajes cifrados para atacar!");
        return;
    }
    console.log("Mensajes cifrados encontrados. Iniciando ataque en el primer mensaje...");
    const targetMessage = messages[0];
    return (0, exports.bruteForceAttack)(targetMessage.message);
};
exports.demonstrateBruteForce = demonstrateBruteForce;
