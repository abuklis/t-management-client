import { Component, Input, Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { Training } from '../entities/training';
import { Router } from '@angular/router';
import 'rxjs/add/operator/toPromise';
// tslint:disable-next-line:import-blacklist
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class TrainingService {
    private trainingsUrl = 'api/trainings';
    private registerUsersUrl = 'users/me';
    private errorUrl = ['/error'];
    private separator = '/';
    private trainingsRoutingUrl = ['/trainings'];

    private headers = new Headers({'Content-Type': 'application/json'});
    private gzipHeaders = new Headers({'Accept-Encoding': 'gzip'});

    constructor(private http: Http,
        private router: Router) {
    }

    getSingleTraining(id: number): Observable<Training> {
        return this.http.get(this.trainingsUrl + this.separator + id)
        .map((res: any) => res.json()).catch(this.handleError);
    }

    getTrainings(): Observable<any> {
        return this.http.get(this.trainingsUrl
            // , {headers: this.gzipHeaders}
        )
        .map((res: any) => res.json()).catch(this.handleError);
    }

    updateTraining(params: string, trainingId: number) {
        this.http.patch(this.trainingsUrl + this.separator + trainingId, params,
            { headers: this.headers}).subscribe(
                data => JSON.stringify(data),
                error => this.handleError);
        this.router.navigate(this.trainingsRoutingUrl);
    }

    deleteTraining(trainingId: number) {
        this.http.delete(this.trainingsUrl + this.separator + trainingId, { headers: this.headers}).subscribe(
                data => JSON.stringify(data),
                error => this.handleError);
        this.router.navigate(this.trainingsRoutingUrl);
    }

    addTraining(requestBody: string) {
        this.http.post(this.trainingsUrl, requestBody, { headers: this.headers}).subscribe(
                data => JSON.stringify(data),
                error => this.handleError);
        this.router.navigate(this.trainingsRoutingUrl);
    }

    registerUserOnTraining(userId: number, trainingId: number): Observable<any> {
        const requestBody = JSON.stringify({
            userId: userId
        });
        return this.http.post(this.trainingsUrl + this.separator + trainingId + this.separator + this.registerUsersUrl,
            requestBody, { headers: this.headers}).map(
            data => JSON.stringify(data),
            error => this.handleError
        );
    }

    private handleError = (error: any) => {
        console.error(error);
        this.router.navigate(this.errorUrl);
        return Observable.of([]);
    }

}
