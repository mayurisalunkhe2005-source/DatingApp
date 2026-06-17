import { FormsModule } from '@angular/forms';
import { AccountService } from '../../app/account-service';
import { Component, inject, signal } from '@angular/core';
@Component({
  selector: 'app-nav',
  imports: [FormsModule],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav {
  protected accountService = inject(AccountService)
  protected creds : any = {}
  login() {
    this.accountService.login(this.creds).subscribe({
      next: (result) => {
        console.log(result);
        this.creds = {};
      },
      error: (error) => console.error(error.message)
    });
  }
  logout() {
    this.accountService.logout();
  }
}

