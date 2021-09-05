"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
// import { checkAuth } from "../middlewares/auth";
// import authRouter from './auth.router';
var user_router_1 = __importDefault(require("./user.router"));
var router = (0, express_1.Router)();
// router.use(authRouter);
router.use('/api', user_router_1.default);
exports.default = router;
