import { hashSync, compareSync } from "bcrypt";
import * as fs from "fs";
import * as path from "path";

interface EncryptedData {
    message: string;
    key: string;
    originalMessage: string;
    timestamp: string;
}

export const encryptMessage = (message: string, key?: string | null) => {
    const secretKey: string = key
        ? key
        : Math.random().toString(36).substring(2, 15);
    const combineParams = message + secretKey;
    const hashedMessage = hashSync(combineParams, 10);

    // Creamos el objeto con los datos encriptados
    const messageData: EncryptedData = {
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

export const decryptMessage = (
    hashedMessage: string,
    key: string
): string | null => {
    const messages = getStoredMessages();
    const foundMessage = messages.find((msg) => msg.message === hashedMessage);
    if (!foundMessage) return null;

    const combineParams = foundMessage.originalMessage + key;
    if (compareSync(combineParams, hashedMessage)) {
        return foundMessage.originalMessage;
    }
    return null;
};

export const getStoredMessages = (): EncryptedData[] => {
    const messagesPath = path.join(__dirname, "keys", "messages.txt");
    if (!fs.existsSync(messagesPath)) return [];

    const content = fs.readFileSync(messagesPath, "utf-8");
    return content
        .split("\n")
        .filter((line) => line.trim() !== "")
        .map((line) => JSON.parse(line));
};
