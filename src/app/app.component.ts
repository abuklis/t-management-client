import { Component } from '@angular/core';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  username: string;
  isUserInSystem: boolean;
  title = 'Trainings Management';

  ngOnInit(): void {
    if (sessionStorage.getItem('username')) {
      this.username = sessionStorage.getItem('username');
      this.isUserInSystem = true;
    } else {
      this.isUserInSystem = false;
    }
  }

  constructor(private userService: UserService) {
  }

  logout() {
    this.userService.tryLogoutUser();
    window.location.reload();
  }
}
