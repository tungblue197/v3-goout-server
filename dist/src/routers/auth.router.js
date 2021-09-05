"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var user_1 = require("../entities/user");
var auth_1 = require("../middlewares/auth");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var crypto_1 = require("crypto");
var bcrypt_1 = __importDefault(require("bcrypt"));
var bcrypt_const_1 = __importDefault(require("../constants/bcrypt.const"));
var jwt_const_1 = __importDefault(require("../constants/jwt.const"));
var httpException_1 = require("../helpers/httpException");
var httpRespone_1 = __importDefault(require("../helpers/httpRespone"));
var passport_1 = __importDefault(require("passport"));
var passportLocal = __importStar(require("passport-local"));
var LocalStrategy = passportLocal.Strategy;
// const GoogleStrategy = passportGoogle.Strategy;
var router = (0, express_1.Router)();
// google login ------------->
// passport.use(new GoogleStrategy({
//     clientID: '771869397488-srfk27ev1njakl645njsj6t1h6u851cj.apps.googleusercontent.com',
//     clientSecret: 'TRTIBLLtt0oAPKQnUvtUQymt',
//     callbackURL: "/auth/google/callback",
//     passReqToCallback: true
//   },
//   function(req, accessToken, refreshToken, profile, cb) {
//       req.user = profile;
//     return cb(null, profile);
//   }
// ))
// passport.serializeUser((user, cb) => {
//     cb(null, user);
// })
// passport.deserializeUser((user: any, cb) => {
//     cb(null, user);
// })
// router.get('/auth/google', passport.authenticate('google', { scope : ['profile'] }));
// router.get('/auth/google/callback', passport.authenticate('google', { successRedirect: '/',failureRedirect: '/error'}),function(req, res) {
//     return res.redirect('/');
// });
//normal login ------------->
router.get('/auth/test', function (req, res) {
    res.sendFile('./index.html');
});
passport_1.default.use(new LocalStrategy(function (username, password, done) {
    var _this = this;
    user_1.User.findOne({ username: username })
        .then(function (user) { return __awaiter(_this, void 0, void 0, function () {
        var isMatchPass;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!user) return [3 /*break*/, 2];
                    return [4 /*yield*/, bcrypt_1.default.compare(password, user.password)];
                case 1:
                    isMatchPass = _a.sent();
                    if (isMatchPass) {
                        return [2 /*return*/, done(null, user)];
                    }
                    return [2 /*return*/, done(null, null)];
                case 2: return [2 /*return*/, done(null, null)];
            }
        });
    }); }).catch(function (err) {
        return done(err, null);
    });
}));
router.post('/auth/register', auth_1.resiterValidate, function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var user, result, payload, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                user = __assign(__assign({}, req.body), { id: (0, crypto_1.randomUUID)(), password: bcrypt_1.default.hashSync(req.body.password, bcrypt_const_1.default.SALTT_OR_ROUNDS) });
                return [4 /*yield*/, user_1.User.insert(user)];
            case 1:
                result = _a.sent();
                if (result) {
                    payload = {
                        username: user.username,
                        id: user.id
                    };
                    jsonwebtoken_1.default.sign(payload, jwt_const_1.default.SECRET_KEY, { expiresIn: 1 * 24 * 60 * 60 * 1000 }, function (err, encoded) {
                        if (err)
                            next(err);
                        return res.status(200).json(httpRespone_1.default.successRespone({ data: { accessToken: encoded } }));
                    });
                }
                next(new httpException_1.HttpException(500, 'server error'));
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                next(err_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.post('/auth/login', function (req, res, next) {
    passport_1.default.authenticate('local', function (err, user, info) {
        if (err)
            return next(err);
        if (user) {
            var payload = {
                username: user.username,
                id: user.id
            };
            var token = jsonwebtoken_1.default.sign(payload, jwt_const_1.default.SECRET_KEY);
            return res.status(200).json(httpRespone_1.default.successRespone({ data: { accessToken: token }, message: 'Login success' }));
        }
        else {
            return next(new httpException_1.HttpException(401, 'sai tài khoản hoạc mật khẩu'));
        }
    })(req, res, next);
});
exports.default = router;
