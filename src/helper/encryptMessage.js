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
exports.getStoredMessages = exports.decryptMessage = exports.encryptMessage = void 0;
const bcrypt_1 = require("bcrypt");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const encryptMessage = (message, key) => {
    const secretKey = key
        ? key
        : Math.random().toString(36).substring(2, 15);
    const combineParams = message + secretKey;
    const hashedMessage = (0, bcrypt_1.hashSync)(combineParams, 10);
    // Creamos el objeto con los datos encriptados
    const messageData = {
        message: hashedMessage,
        key: secretKey,
        originalMessage: message,
        timestamp: new Date().toISOString(),
    };
    const messagesPath = path.join(__dirname, "keys", "messages.txt");
    const keysPath = path.join(__dirname, "keys", "secret_keys.txt");
    // Agregamos el mensaje encriptado y la clave a sus respectivos archivos
    fs.appendFileSync(messagesPath, JSON.stringify(messageData) + "\n");
    fs.appendFileSync(keysPath, secretKey + "\n");
    return hashedMessage;
};
exports.encryptMessage = encryptMessage;
const decryptMessage = (hashedMessage, key) => {
    const messages = (0, exports.getStoredMessages)();
    const foundMessage = messages.find((msg) => msg.message === hashedMessage);
    if (!foundMessage)
        return null;
    const combineParams = foundMessage.originalMessage + key;
    if ((0, bcrypt_1.compareSync)(combineParams, hashedMessage)) {
        return foundMessage.originalMessage;
    }
    return null;
};
exports.decryptMessage = decryptMessage;
const getStoredMessages = () => {
    const messagesPath = path.join(__dirname, "keys", "messages.txt");
    if (!fs.existsSync(messagesPath))
        return [];
    const content = fs.readFileSync(messagesPath, "utf-8");
    return content
        .split("\n")
        .filter((line) => line.trim() !== "")
        .map((line) => JSON.parse(line));
};
exports.getStoredMessages = getStoredMessages;
