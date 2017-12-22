import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Location } from '@angular/common';
import { TrainingService } from '../services/training.service';


@Component({
  selector: 'app-add-training',
  templateUrl: '../pages/add-training.component.html',
  styleUrls: ['../app.component.css']
})

export class AddTrainingComponent {
    title: string;
    description: string;
    attendeesAmount: number;
    teacherId: number;
    registrationOpen: boolean;
    startDate: string;
    endDate: string;

    constructor(private trainingService: TrainingService,
                private route: ActivatedRoute,
                private location: Location) {
    }

    saveTraining() {
        const requestBody =  JSON.stringify({
            title: this.title,
            description: this.description,
            attendeesAmount: this.attendeesAmount,
            teacherId: this.teacherId,
            registrationOpen:  this.registrationOpen,
            startDate: this.startDate,
            endDate: this.endDate
          });
        console.log('New training params:' + requestBody);
        this.trainingService.addTraining(requestBody);
    }

    goBack() {
        this.location.back();
    }
}
