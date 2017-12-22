import { Component, Input, OnInit } from '@angular/core';
import { User } from '../entities/user';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { UserService } from '../services/user.service';
import 'rxjs/add/operator/switchMap';

import { Location } from '@angular/common';

@Component({
  selector: 'app-user-detail',
  templateUrl: '../pages/user-details.component.html',
  styleUrls: ['../app.component.css']
})

export class UserDetailComponent implements OnInit {
    @Input() user: User;

    constructor(private userService: UserService,
                private route: ActivatedRoute,
                private location: Location) { }

    ngOnInit(): void {
        this.route.paramMap.switchMap((params: ParamMap) =>
        this.userService.getSingleUser(+params.get('id')))
              .subscribe(user => this.user = user);
    }

    goBack() {
        this.location.back();
    }
}
