"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
// import all routes
const book_Routes_1 = __importDefault(require("./app/routes/book.Routes"));
const borrow_Routes_1 = __importDefault(require("./app/routes/borrow.Routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.set('view engine', 'ejs'); // fix case: 'view engine' lowercase v
app.use((0, cors_1.default)({
    origin: [
        'http://localhost:5173',
        'https://client-side-seven-xi.vercel.app'
    ],
    credentials: true,
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
app.use((0, cookie_parser_1.default)());
app.use('/api', book_Routes_1.default);
app.use('/api', borrow_Routes_1.default);
app.get('/', (req, res) => {
    res.send('hello....typescript diye new start??');
});
exports.default = app;
