import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrainingsComponent } from './components/trainings.component';
import { UsersComponent } from './components/users.component';
import { ErrorComponent } from './components/error.component';
import { UserDetailComponent } from './components/user-details.component';
import { TrainingDetailComponent } from './components/training-details.component';
import { LoginComponent } from './components/login.component';
import { EditTrainingComponent } from './components/edit-training.component';
import { AddTrainingComponent } from './components/add-training.component';
import { WeatherComponent } from './components/weather.component';


const routes: Routes = [
    { path: '', redirectTo: '/trainings', pathMatch: 'full' },
    { path: 'login',  component: LoginComponent},
    { path: 'trainings',  component: TrainingsComponent},
    { path: 'trainings/:id', component: TrainingDetailComponent },
    { path: 'users',  component: UsersComponent},
    { path: 'trainings/:id/edit', component: EditTrainingComponent },
    { path: 'error', component: ErrorComponent },
    { path: 'trainings/add', component: AddTrainingComponent },
    { path: 'users/:id', component: UserDetailComponent },
    { path: 'weather', component: WeatherComponent }
  ];
  @NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
  })

  export class AppRoutingModule {}
