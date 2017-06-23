"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by jisaac1 on 6/11/17.
 */
var AppSettings = (function () {
    function AppSettings() {
    }
    return AppSettings;
}());
AppSettings.API_ENDPOINT = 'http://localhost:9000';
AppSettings.API_TOKEN_KEY = 'X-Auth-Token';
AppSettings.CHECK_USER_ENDPOINT = 'http://localhost:9000/api/check';
AppSettings.FETCH_USER_LOGIN_ENDPOINT = 'http://localhost:9000/api/users/';
AppSettings.FETCH_USER_EMAIL_ENDPOINT = 'http://localhost:9000/api/users/email/';
exports.AppSettings = AppSettings;
//# sourceMappingURL=app.settings.js.map