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
///<reference path="../../../node_modules/@angular/forms/src/model.d.ts"/>
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var index_1 = require("../_services/index");
var user_1 = require("../_models/user");
var forms_1 = require("@angular/forms");
// import RegistrationValidator from "./registration-login-async.validator";
var RegisterComponent = (function () {
    function RegisterComponent(router, userService, alertService, fb) {
        this.router = router;
        this.userService = userService;
        this.alertService = alertService;
        this.fb = fb;
        this.model = new user_1.User(); //any = {};
        this.loading = false;
        this.model = new user_1.User();
    }
    RegisterComponent.prototype.ngOnInit = function () {
        //called after the constructor and called  after the first ngOnChanges()
        this.model = new user_1.User(); //any = {};
        this.signUpForm = this.fb.group({
            firstname: [this.model.firstname, forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.maxLength(50)])],
            lastname: [this.model.lastname, forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.maxLength(50)])],
            login: [this.model.login, [forms_1.Validators.required]],
            email: [this.model.email, forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.email])],
            password: [this.model.email, forms_1.Validators.required]
        });
    };
    RegisterComponent.prototype.register = function () {
        var _this = this;
        this.loading = true;
        console.log("this.signUpForm.value is : " + JSON.stringify(JSON.stringify(this.signUpForm.value)));
        console.log("this.model is : " + JSON.stringify(JSON.stringify(this.model)));
        this.userService.create(this.signUpForm.value)
            .subscribe(function (data) {
            _this.alertService.success('Registration successful', true);
            console.log("saved successfully!");
            _this.router.navigate(['/login']);
        }, function (error) {
            _this.alertService.error(error);
            _this.loading = false;
            console.log("didn't save successfully: " + error.toString());
        });
    };
    return RegisterComponent;
}());
RegisterComponent = __decorate([
    core_1.Component({
        moduleId: module.id.toString(),
        selector: 'register-cmp',
        templateUrl: 'register.component.html',
    }),
    __metadata("design:paramtypes", [router_1.Router,
        index_1.UserService,
        index_1.AlertService,
        forms_1.FormBuilder])
], RegisterComponent);
exports.RegisterComponent = RegisterComponent;
//# sourceMappingURL=register.component.js.map