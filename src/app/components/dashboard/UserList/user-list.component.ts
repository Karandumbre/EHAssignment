import { Component, OnInit, Input } from '@angular/core';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  @Input() UserData: any;
  public keys = [];
  public user = {
    Email: '',
    FirstName: '',
    LastName: '',
    Phone: '',
    Status: 'Inactive'
  };
  public showUserModal = false;
  public showTableDashboard = false;
  public ChildConfig = { message: '', toUpdate: 'false' };
  constructor(private userService: UserService) { }

  ngOnInit() {
    if (Array.isArray(this.UserData) && this.UserData.length > 0) {
      this.keys = Object.keys(this.UserData[0]);
      this.showTableDashboard = this.keys.length > 0 ? true : false;
    }
  }

  editUserData(id) {
    if (id === null) {
      this.ChildConfig.message = 'Create User';
      this.ChildConfig.toUpdate = 'false';
    } else {
      this.ChildConfig.message = 'Save Details';
      this.ChildConfig.toUpdate = 'true';
      this.user = this.UserData[id];
    }
    this.showUserModal = true;
  }

  closeModal() {
    setTimeout(() => {
      this.showUserModal = false;
    }, 0);
  }

  deleteUser(i) {
    const id = this.UserData[i].id;
    this.userService.deleteUser(id).subscribe(() => {
      alert('User Deleted Successfully');
      this.userService.refresh.next('refresh');
    });
  }

}

