import { Component, Input, OnInit, transition } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { LowerCasePipe } from '@angular/common';
import 'rxjs/add/operator/switchMap';
import { Location } from '@angular/common';
import { UserService } from '../services/user.service';
import { User } from '../entities/user';


@Component({
  selector: 'app-login',
  templateUrl: '../pages/login.component.html',
  styleUrls: ['../app.component.css']
})

export class LoginComponent {
    email: string;
    password: string;
    name: string;
    user: User;

    constructor(private userService: UserService,
        private location: Location,
        private router: Router) {
     }

    login() {
        this.userService.tryLogin(this.email, this.password)
        .subscribe(data => {
            this.findUser();
        });
    }

    findUser() {
       this.userService.getUserByEmail(this.email)
        .subscribe(data => {
            console.log(data);
            this.user = data;
            sessionStorage.setItem('username', data.firstName);
            sessionStorage.setItem('userId', data.userId.toString());
            sessionStorage.setItem('userRole', data.role);
            console.log('User data : ' + data.firstName + ', ' + data.userId + ', ' + data.role);
             this.router.navigate(['/trainings']);
        });
        this.password = null;
    }

    goBack() {
        this.location.back();
    }
}
