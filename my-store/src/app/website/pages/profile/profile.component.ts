import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: User | null = null;
  constructor(
    private aAuthService: AuthService
  ) { }

  ngOnInit(): void {
    this.aAuthService.getProfile()
    .subscribe(data =>{
      this.user= data;
    })
  }

}
