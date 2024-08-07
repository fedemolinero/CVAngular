import { AuthService } from '@services/auth.service';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mainmenu',
  templateUrl: './mainmenu.component.html',
  styleUrl: './mainmenu.component.scss'
})
export class MainmenuComponent {

  @Input() isAuthenticated!: boolean | null;
  @Input() backgroundColor: string = '';

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  goHome() {
    this.router.navigate(['']);
  }

  goRegister() {
    this.router.navigate(['register']);
  }

  goLogin() {
    this.router.navigate(['login']);
  }

  goLayout() {
    this.router.navigate(['layout']);
  }

  goLogout() {
    this.authService.logout();
  }

}
