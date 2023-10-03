"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateUID = void 0;
function generateUID() {
    const uidLength = 20;
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let uid = "B#00";
    for (let i = 0; i < uidLength; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        uid += characters.charAt(randomIndex);
    }
    return uid;
}
exports.generateUID = generateUID;
