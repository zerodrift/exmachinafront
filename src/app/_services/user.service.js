"use strict";
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
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var app_settings_1 = require("../app.settings");
var UserService = (function () {
    function UserService(http) {
        this.http = http;
        this.host = app_settings_1.AppSettings.API_ENDPOINT;
    }
    UserService.prototype.getAll = function () {
        return this.http.get(this.host + '/api/users', this.jwt()).map(function (response) { return response.json(); });
    };
    UserService.prototype.getById = function (id) {
        return this.http.get(this.host + '/api/users/' + id, this.jwt()).map(function (response) { return response.json(); });
    };
    UserService.prototype.getUser = function (login) {
        return this.http.get(app_settings_1.AppSettings.FETCH_USER_LOGIN_ENDPOINT + login).map(function (response) { return response.json(); });
    };
    UserService.prototype.create = function (user) {
        return this.http.post(this.host + '/api/users', {
            "id": 0,
            "login": user.login,
            "password": user.password,
            "firstname": user.firstname,
            "lastname": user.lastname,
            "email": user.email
        }, this.jwt()).map(function (response) { return response.json(); });
    };
    UserService.prototype.update = function (user) {
        return this.http.put(this.host + '/api/users/' + user.id, user, this.jwt()).map(function (response) { return response.json(); });
    };
    UserService.prototype.delete = function (id) {
        return this.http.delete(this.host + '/api/users/' + id, this.jwt()).map(function (response) { return response.json(); });
    };
    // private helper methods
    UserService.prototype.jwt = function () {
        // create authorization header with jwt token
        var currentUser = localStorage.getItem('currentUser');
        console.log("current user is: " + JSON.stringify(currentUser));
        var tokenKey = app_settings_1.AppSettings.API_TOKEN_KEY;
        return { headers: new http_1.Headers((_a = {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': 'http://localhost:8080'
                },
                _a[tokenKey] = currentUser //square braces to reference a variable in json
            ,
                _a)) };
        var _a;
    };
    return UserService;
}());
UserService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map