import { Component, Input , OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { LowerCasePipe } from '@angular/common';
import 'rxjs/add/operator/switchMap';

import { Location } from '@angular/common';
import { Training } from '../entities/training';
import { TrainingService } from '../services/training.service';

@Component({
  selector: 'app-edit-training',
  templateUrl: '../pages/edit-training.component.html',
  styleUrls: ['../app.component.css']
})

export class EditTrainingComponent implements OnInit {
    training: Training;

    trainingId: number;
    title: string;
    description: string;
    attendeesAmount: number;
    teacherId: number;
    startDate: string;
    endDate: string;
    isRegistrationOpen: string;

    constructor(private trainingService: TrainingService,
                private route: ActivatedRoute,
                private location: Location) {
    }

    ngOnInit(): void {
        this.route.paramMap.switchMap((params: ParamMap) =>
            this.trainingService.getSingleTraining(+params.get('id')))
            .subscribe(data => {this.training = data;
                this.title = data.title;
                this.description = data.description;
                this.attendeesAmount = data.attendeesAmount;
                this.teacherId = data.teacher.userId;
                this.startDate = data.startDate;
                this.endDate = data.endDate;
            });
        this.trainingId = +this.route.snapshot.params['id'];
    }

    goBack() {
        this.location.back();
    }

    editTraining() {
        if (this.training.registrationOpen) {
            this.isRegistrationOpen = 'Y';
        } else {
            this.isRegistrationOpen = 'N';
        }
        const params =  JSON.stringify({
            trainingId: this.trainingId,
            title: this.title === null ? this.training.title : this.title,
            description: this.description === null ? this.training.description : this.description,
            attendeesAmount: this.attendeesAmount === null ? this.training.attendeesAmount : this.attendeesAmount,
            teacherId: this.teacherId === null ? this.training.teacher.userId : this.teacherId,
            isRegistrationOpen:  this.isRegistrationOpen,
            startDate: this.training.startDate,
            endDate: this.training.endDate
          });
        console.log('New training params:' + params);
        this.trainingService.updateTraining(params, this.trainingId);
    }
}
