"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var connection = (0, typeorm_1.createConnection)({
    type: 'sqlite',
    database: './db/db.sqlite',
    synchronize: true,
    logging: true
});
exports.default = connection;
