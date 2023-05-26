"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const request_1 = __importDefault(require("request"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = process.env.port || 3000;
app.use((0, cors_1.default)());
app.use((req, res, next) => {
    res.setHeader('X-Frame-Options', 'ALLOW-FROM *');
    next();
});
app.use((req, res) => {
    const url = `https://brainly.co.id${req.url}`;
    const proxyRequest = (0, request_1.default)(url);
    proxyRequest.on('response', (proxyResponse) => {
        if (proxyResponse.headers['set-cookie']) {
            delete proxyResponse.headers['set-cookie'];
        }
    });
    req.pipe(proxyRequest).pipe(res);
});
app.listen(port, () => {
    console.log(`🚀 Server started on port ${port}\n🌐 http://localhost:${port}/`);
});
