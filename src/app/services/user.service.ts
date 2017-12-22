import { Component, Input, Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { Training } from '../entities/training';
import { Router } from '@angular/router';
import 'rxjs/add/operator/toPromise';
// tslint:disable-next-line:import-blacklist
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { User } from '../entities/user';

@Injectable()
export class UserService {
    private usersUrl = 'api/users';
    private userUrl = 'api/user?email=';
    private separator = '/';
    private loginUrl = '/login';
    private loginRedirectUrl = ['/login'];
    private isLoggedIn = false;
    private errorUrl = ['/error'];

    private jsonHeaders = new Headers({'Content-Type': 'application/json'});
    private authHeaders = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});

    constructor(private http: Http,
        private router: Router) {
    }

    getUsers(): Observable<any> {
        return this.http.get(this.usersUrl)
        .map((res: any) => {
            if (res.status === 302) {
                alert('Access denied. Please, sign in');
                this.router.navigate(this.loginRedirectUrl);
            } else {
                res.json();
            }
        }).catch(this.handleError);
    }

    getSingleUser(id: number): Observable<User> {
        return this.http.get(this.usersUrl + this.separator + id)
        .map((res: any) => res.json()).catch(this.handleError);
    }

    getUserByEmail(email: String): Observable<User> {
        return this.http.get(this.userUrl + email)
        .map((res: any) => res.json()).catch(this.handleError);
    }

    tryLogin(email: string, password: string): Observable<any> {
        const body = 'email=' + email + '&password=' + password;
        return this.http.post(this.loginUrl, body, {headers: this.authHeaders})
        .map((res: any) => {
            if (res.status === 200) {
                alert('Successful login.');
            }
    }).catch(this.handleError);
    }

    tryLogoutUser() {
        sessionStorage.removeItem('username');
    }

    private handleError = (error: any) => {
        if (error.status === 401 || error.status === 403) {
            alert('Bad credentials!');
            this.router.navigate(this.errorUrl);
            return Observable.throw(new Error(error.status));
        }
        console.error(error);
        this.router.navigate(this.errorUrl);
        return Observable.of([]);
    }
}
