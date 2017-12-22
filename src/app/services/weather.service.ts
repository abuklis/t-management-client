import { Component, Input, Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/toPromise';
// tslint:disable-next-line:import-blacklist
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { User } from '../entities/user';

@Injectable()
export class WeatherService {
    private weatherUrl = 'api/weather/current';
    private errorUrl = ['/error'];

    private jsonHeaders = new Headers({'Content-Type': 'application/json'});

    constructor(private http: Http,
        private router: Router) {
    }

    getWeather(): Observable<any> {
        return this.http.get(this.weatherUrl)
        .map((res: any) => res.json()).catch(this.handleError);
    }

    private handleError = (error: any) => {
        if (error.status === 401 || error.status === 403) {
            this.router.navigate(this.errorUrl);
            return Observable.throw(new Error(error.status));
        }
        console.error(error);
        this.router.navigate(this.errorUrl);
        return Observable.of([]);
    }
}
