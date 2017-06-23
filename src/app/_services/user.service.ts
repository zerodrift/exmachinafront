import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { User } from '../_models/index';
import {AppSettings} from "../app.settings";

@Injectable()
export class UserService {
    constructor(private http: Http) { }

    readonly host = AppSettings.API_ENDPOINT;

    getAll() {
        return this.http.get(this.host + '/api/users', this.jwt()).map((response: Response) => response.json());
    }

    getById(id: number) {
        return this.http.get(this.host + '/api/users/' + id, this.jwt()).map((response: Response) => response.json());
    }

    getUserByLogin(login:string) {
        return this.http.get(AppSettings.FETCH_USER_LOGIN_ENDPOINT + login).map( response => response.json());
    }

    getUserByEmail(email:string) {
        return this.http.get(AppSettings.FETCH_USER_EMAIL_ENDPOINT + email).map( response => response.json());
    }

    create(user: User) {
        return this.http.post(this.host + '/api/users', {
            "id":0,
            "login":user.login,
            "password":user.password,
            "firstname": user.firstname,
            "lastname": user.lastname,
            "email": user.email}, this.jwt()).map((response: Response) => response.json());
    }

    update(user: User) {
        return this.http.put(this.host + '/api/users/' + user.id, user, this.jwt()).map((response: Response) => response.json());
    }

    delete(id: number) {
        return this.http.delete(this.host + '/api/users/' + id, this.jwt()).map((response: Response) => response.json());
    }

    // private helper methods

    private jwt() {
        // create authorization header with jwt token
        let currentUser: string = localStorage.getItem('currentUser');
        console.log("current user is: " + JSON.stringify(currentUser));
        let tokenKey = AppSettings.API_TOKEN_KEY;
        return { headers: new Headers({
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin' : 'http://localhost:8080',
                [tokenKey]: currentUser //square braces to reference a variable in json
            })};
    }
}