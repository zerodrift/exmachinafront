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

    create(user: User) {
        return this.http.post(this.host + '/api/users', user, this.jwt()).map((response: Response) => response.json());
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
        let tokenKey = AppSettings.API_TOKEN_KEY;
        return { headers: new Headers({
                'Content-Type': 'application/json',
                [tokenKey]: currentUser //square braces to reference a variable in json
            })};
    }
}