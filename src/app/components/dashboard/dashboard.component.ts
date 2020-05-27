import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public showUserListPanel: boolean;
  public UserData: any;
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.fetchProfiles();
    this.userService.refresh.subscribe(res => {
      if (res === 'refresh') {
        this.fetchProfiles();
      }
    });
  }

  fetchProfiles() {
    this.userService.fetchAllUserProfile().subscribe(res => {
      this.UserData = res;
      this.showUserListPanel = true;
    });
  }
}
