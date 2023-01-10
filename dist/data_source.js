"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
require("dotenv/config");
const path_1 = __importDefault(require("path"));
const typeorm_1 = require("typeorm"); // Vai fazer conexão com o banco de dados
const AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: process.env.PGHOST,
    username: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    port: parseInt(process.env.PGPORT),
    database: process.env.DB,
    synchronize: false,
    logging: true,
    entities: [path_1.default.join(__dirname, "./entities/**.{js,ts}")],
    migrations: [path_1.default.join(__dirname, "./migrations/**.{js,ts}")],
});
exports.default = AppDataSource;
//# sourceMappingURL=data_source.js.map