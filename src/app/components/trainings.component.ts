// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs/Rx';

import { Component, Input, OnInit } from '@angular/core';
import { Training } from '../entities/training';
import { TrainingService } from '../services/training.service';

@Component({
    selector: 'app-room-search',
    templateUrl: '../pages/trainings.component.html',
    styleUrls: ['../app.component.css']
  })

export class TrainingsComponent implements OnInit {
    private trainingsUrl = 'api/trainings';
    trainings: Training[] = [];

    constructor(private trainingService: TrainingService) {}

    ngOnInit(): void {
        this.trainingService.getTrainings().subscribe(data => this.trainings = data,
          error => console.log(error));
      }

}
