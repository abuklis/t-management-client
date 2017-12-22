import { Component, Input, OnInit } from '@angular/core';
import { User } from '../entities/user';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { TrainingService } from '../services/training.service';
import 'rxjs/add/operator/switchMap';

import { Location } from '@angular/common';
import { Training } from '../entities/training';

@Component({
  selector: 'app-training-detail',
  templateUrl: '../pages/training-details.component.html',
  styleUrls: ['../app.component.css']
})

export class TrainingDetailComponent implements OnInit {
    @Input() training: Training;
    isStudentInSystem: boolean;
    userId = 5;

    constructor(private trainingService: TrainingService,
                private route: ActivatedRoute,
                private location: Location) { }

    ngOnInit(): void {
        this.route.paramMap.switchMap((params: ParamMap) =>
        this.trainingService.getSingleTraining(+params.get('id')))
              .subscribe(training => this.training = training);
        if (sessionStorage.getItem('userRole') === 'STUDENT' && this.training.registrationOpen) {
            console.log('student detected!');
            this.userId = +sessionStorage.getItem('userId').toString();
            this.isStudentInSystem = true;
        } else {
            console.log('not student');
            this.isStudentInSystem = false;
        }
    }

    goBack() {
        this.location.back();
    }

    registerOnTraining() {
        const trainingId = +this.route.snapshot.params['id'];
        this.trainingService.registerUserOnTraining(this.userId, trainingId)
        .subscribe(data => {
            alert('Registered!');
        });
    }

    deleteTraining() {
        const trainingId = +this.route.snapshot.params['id'];
        this.trainingService.deleteTraining(trainingId);
    }
}
