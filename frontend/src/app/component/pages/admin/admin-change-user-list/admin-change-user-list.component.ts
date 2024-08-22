import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../../../shared/models/User';
import { UserService } from '../../../../services/user/user.service';

@Component({
  selector: 'admin-change-user-list',
  templateUrl: './admin-change-user-list.component.html',
  styleUrl: './admin-change-user-list.component.css'
})
export class AdminChangeUserListComponent{
  users: User[] = [];
  defaultUserImage: string = './assets/default-user.jpg'; 

  constructor(private userService: UserService){
    const userObservable = userService.getAll()

    userObservable.subscribe((serverUsers) => {
      this.users = serverUsers;
    })
  }
}
