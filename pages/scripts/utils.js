"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getValueFromLocalStorage = exports.persistToLocalStorage = void 0;
function persistToLocalStorage(key, data) {
    if (typeof data === "string") {
        localStorage.setItem(key, data);
    }
    else {
        localStorage.setItem(key, JSON.stringify(data));
    }
}
exports.persistToLocalStorage = persistToLocalStorage;
function getValueFromLocalStorage(key) {
    return localStorage.getItem(key);
}
exports.getValueFromLocalStorage = getValueFromLocalStorage;
