import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { TrainingService } from './services/training.service';
import { UserService } from './services/user.service';
import { UsersComponent } from './components/users.component';
import { TrainingsComponent } from './components/trainings.component';
import { AppRoutingModule } from './app-routing.module';
import { ErrorComponent } from './components/error.component';
import { UserDetailComponent } from './components/user-details.component';
import { TrainingDetailComponent } from './components/training-details.component';
import { LoginComponent } from './components/login.component';
import { EditTrainingComponent } from './components/edit-training.component';
import { AddTrainingComponent } from './components/add-training.component';
import { WeatherService } from './services/weather.service';
import { WeatherComponent } from './components/weather.component';


@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    TrainingsComponent,
    ErrorComponent,
    UserDetailComponent,
    TrainingDetailComponent,
    LoginComponent,
    EditTrainingComponent,
    AddTrainingComponent,
    WeatherComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule
  ],
  providers: [TrainingService, UserService, WeatherService],
  bootstrap: [AppComponent]
})
export class AppModule { }
