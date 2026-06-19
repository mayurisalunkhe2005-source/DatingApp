import { FormsModule } from '@angular/forms';
import { AccountService } from '../../app/account-service';
import { Component, inject, } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { Router } from '@angular/router';
import { ToastService } from '../../app/toast-service';
@Component({
  selector: 'app-nav',
  imports: [FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav {
  protected accountService = inject(AccountService);
  protected creds: any = {}
  private router = inject(Router);
  private toast=inject(ToastService)
  
login() {
  this.accountService.login(this.creds).subscribe({
    next: ()=> {
      this.router.navigateByUrl('/members');
      this.toast.sucess('Logged In Successfully')
      this.creds = {};
    },
    error: (error) => {
      this.toast.error(error.error)
    }
  });
}

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }
}

