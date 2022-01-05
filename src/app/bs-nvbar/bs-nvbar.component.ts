import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { AppUser } from '../models/app-user';

@Component({
  selector: 'bs-nvbar',
  templateUrl: './bs-nvbar.component.html',
  styleUrls: ['./bs-nvbar.component.css'],
})
export class BsNvbarComponent {
  appUser: AppUser;

  constructor(private auth: AuthService) {
    auth.appUser$.subscribe((appUser) => (this.appUser = appUser!));
  }

  logout() {
    this.auth.logout();
  }
}
