"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var location_1 = require("../src/entities/location");
var session_1 = require("../src/entities/session");
var user_1 = require("../src/entities/user");
var vote_1 = require("../src/entities/vote");
var connection = (0, typeorm_1.createConnection)({
    type: 'sqlite',
    database: __dirname + '/db.sqlite',
    synchronize: true,
    logging: true,
    entities: [
        user_1.User,
        location_1.Location,
        vote_1.Vote,
        session_1.Session
    ]
});
exports.default = connection;
