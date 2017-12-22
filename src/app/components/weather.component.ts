import { Component, Input, OnInit } from '@angular/core';
import { User } from '../entities/user';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { TrainingService } from '../services/training.service';
import 'rxjs/add/operator/switchMap';

import { Location } from '@angular/common';
import { Training } from '../entities/training';
import { WeatherService } from '../services/weather.service';
import { WeatherInfo } from '../entities/weather-info';

@Component({
  selector: 'app-weather',
  templateUrl: '../pages/weather.component.html',
  styleUrls: ['../app.component.css']
})

export class WeatherComponent implements OnInit {
    weatherInfo: WeatherInfo;

    constructor(private weatherService: WeatherService) { }

    ngOnInit(): void {
        this.weatherService.getWeather()
        .subscribe(data => this.weatherInfo = data);
    }
}
