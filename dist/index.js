"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var db_init_1 = __importDefault(require("./db/db.init"));
var app = (0, express_1.default)();
db_init_1.default.then(function (res) {
    console.log('res : ', res);
}).catch(function (err) {
    console.log('err : ', err);
});
app.get('/', function (req, res, next) {
    res.json({ name: 'hello' });
});
app.listen(process.env.PORT || 5000);
