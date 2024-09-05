"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const error_middlewares_1 = require("./common/middlewares/error.middlewares");
const guru_routes_1 = __importDefault(require("./routes/guru.routes"));
const session_routes_1 = __importDefault(require("./routes/session.routes"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const kelas_routes_1 = require("./routes/kelas.routes");
const kelompok_routes_1 = require("./routes/kelompok.routes");
const pertandingan_routes_1 = require("./routes/pertandingan.routes");
const nilai_routes_1 = require("./routes/nilai.routes");
const story_routes_1 = require("./routes/story.routes");
const restory_routes_1 = require("./routes/restory.routes");
const app = (0, express_1.default)();
const port = 8080;
const corsOption = {
    origin: ['https://chronicles.heritsam.dev', 'http://localhost:5173'],
    credentials: true,
};
function corsMidd(req, res, next) {
    // Allow requests from any origin
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Allow specific HTTP methods
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    // Allow specific headers to be sent in the request
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    // Allow credentials (e.g., cookies, authentication) to be included in requests
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
}
app.use(express_1.default.json());
app.use(error_middlewares_1.errorMiddleware);
app.use((0, cors_1.default)(corsOption));
app.options('*', (0, cors_1.default)());
app.use((0, cookie_parser_1.default)());
app.use(corsMidd);
//handle logger
app.use((req, res, next) => {
    console.log(req.method, req.hostname, req.path);
    next();
});
app.use('/chronicles-v1/api/guru', guru_routes_1.default);
app.use('/chronicles-v1/api/kelas', kelas_routes_1.kelasRouter);
app.use('/chronicles-v1/api/kelompok', kelompok_routes_1.kelompokRouter);
app.use('/chronicles-v1/api/pertandingan', pertandingan_routes_1.pertandinganRouter);
app.use('/chronicles-v1/api/nilai', nilai_routes_1.nilaiRouter);
app.use('/chronicles-v1/api/session', session_routes_1.default);
app.use('/chronicles-v1/api/story', story_routes_1.storyRouter);
app.use('/chronicles-v1/api/restory', restory_routes_1.restoryRouter);
app.use((error, req, res, next) => {
    res.status(500).json({ message: error.message });
});
app.get('/cookies', function (req, res) {
    console.log('Cookies: ', req);
    console.log('Signed Cookies: ', req.signedCookies);
});
app.listen(port, () => {
    console.log(`Server is listening in ${port}`);
});
exports.default = app;
