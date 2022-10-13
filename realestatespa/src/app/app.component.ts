import { Component } from '@angular/core';
import { User } from './_models/user';
import { AccountService } from './_services/account.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Real Estate';


  constructor(private accountService: AccountService,) {}

  // tslint:disable-next-line: typedef

  ngOnInit(){
    this.setCurrentUser();
  }

  setCurrentUser(){
    const user: User =JSON.parse(localStorage.getItem('user'));
    this.accountService.setCurrentUser(user);
  }

  onActivate() {
    window.scroll(-1000,-1000);
}

}
