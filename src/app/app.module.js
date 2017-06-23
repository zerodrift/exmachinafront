"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
// used to create fake backend
// import { fakeBackendProvider } from './_helpers/index';
// import { MockBackend, MockConnection } from '@angular/http/testing';
var http_2 = require("@angular/http");
var app_component_1 = require("./app.component");
var app_routing_1 = require("./app.routing");
var index_1 = require("./_directives/index");
var index_2 = require("./_guards/index");
var index_3 = require("./_services/index");
var index_4 = require("./home/index");
var index_5 = require("./login/index");
var index_6 = require("./register/index");
var material_module_1 = require("./material.module");
var admin_layout_component_1 = require("./admin/admin-layout.component");
var sidebar_module_1 = require("./sidebar/sidebar.module");
var navbar_component_1 = require("./shared/navbar/navbar.component");
var footer_component_1 = require("./shared/footer/footer.component");
var registration_email_async_validator_1 = require("./register/registration-email-async.validator");
var registration_login_async_validator_1 = require("./register/registration-login-async.validator");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            forms_1.FormsModule,
            http_1.HttpModule,
            app_routing_1.routing,
            material_module_1.MyMaterialModule,
            sidebar_module_1.SidebarModule,
            forms_1.ReactiveFormsModule,
        ],
        declarations: [
            app_component_1.AppComponent,
            index_1.AlertComponent,
            index_4.HomeComponent,
            index_5.LoginComponent,
            index_6.RegisterComponent,
            admin_layout_component_1.AdminLayoutComponent,
            navbar_component_1.NavbarComponent,
            footer_component_1.FooterComponent,
            registration_login_async_validator_1.default,
            registration_email_async_validator_1.default
        ],
        providers: [
            index_2.AuthGuard,
            index_3.AlertService,
            index_3.AuthenticationService,
            index_3.UserService,
            // providers used to create fake backend
            // fakeBackendProvider,
            // MockBackend,
            http_2.BaseRequestOptions
        ],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map