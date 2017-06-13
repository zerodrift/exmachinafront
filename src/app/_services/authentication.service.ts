import { Injectable } from '@angular/core';
import {Http, Headers, Response, RequestOptions, RequestMethod, RequestOptionsArgs} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import {Req} from "awesome-typescript-loader/dist/checker/protocol";
import {AppSettings} from "../app.settings";

@Injectable()
export class AuthenticationService {
    constructor(private http: Http) {}

    headers = new Headers({
        'Content-Type': 'application/json'
    });

    login(username: string, password: string) {

        return this.http.post(
            AppSettings.API_ENDPOINT + '/api/auth',null,
            {
                headers: new Headers({
                    'Content-Type': 'application/json',
                    // 'X-Auth-Token': 'this is a cookie'
                }),
                body: JSON.stringify({ login: username, password: password }),
            })
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let user = response.json();
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }
            });
    }

    logout() {
        // remove user from local storage to log user out
        // #TODO: remove token from database !
        let currentUser = localStorage.getItem('currentUser');
        localStorage.removeItem('currentUser');
        return this.http.delete(AppSettings.API_ENDPOINT + '/api/auth', {
            headers: new Headers({
                'Content-Type': 'application/json',
                'X-Auth-Token': currentUser
            }),
        })
            .subscribe(
                data => console.log('successfully deleted token'), //success
                err => console.log(`error couldn't delete token: ${err}`), //failure
                () => console.log('deleted token') //complete
            );

    }


}