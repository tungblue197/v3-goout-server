"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Session = void 0;
var typeorm_1 = require("typeorm");
var location_1 = require("./location");
var Session = /** @class */ (function (_super) {
    __extends(Session, _super);
    function Session() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        (0, typeorm_1.PrimaryColumn)(),
        __metadata("design:type", String)
    ], Session.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            nullable: true,
            default: null
        }),
        __metadata("design:type", String)
    ], Session.prototype, "title", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            nullable: true,
            default: null
        }),
        __metadata("design:type", String)
    ], Session.prototype, "content", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            nullable: true,
            default: false
        }),
        __metadata("design:type", Boolean)
    ], Session.prototype, "done", void 0);
    __decorate([
        (0, typeorm_1.OneToOne)(function () { return location_1.Location; }),
        (0, typeorm_1.JoinColumn)(),
        __metadata("design:type", String)
    ], Session.prototype, "winLocation", void 0);
    __decorate([
        (0, typeorm_1.ManyToMany)(function () { return location_1.Location; }),
        (0, typeorm_1.JoinTable)(),
        __metadata("design:type", Array)
    ], Session.prototype, "locations", void 0);
    Session = __decorate([
        (0, typeorm_1.Entity)('sessions')
    ], Session);
    return Session;
}(typeorm_1.BaseEntity));
exports.Session = Session;
