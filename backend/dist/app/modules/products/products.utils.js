"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateProductCode = void 0;
function generateProductCode() {
    const codeLength = 6;
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let code = "P#";
    for (let i = 0; i < codeLength; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        code += characters.charAt(randomIndex);
    }
    return code;
}
exports.generateProductCode = generateProductCode;
