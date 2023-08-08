"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const api = (0, express_1.default)();
const clientDirectory = path_1.default.join(__dirname, '..', 'public');
api.use('/', express_1.default.static(clientDirectory));
const server = http_1.default.createServer(api);
server.listen(4000, () => {
    console.log("web server running and listening on port 4000...");
});
