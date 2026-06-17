import { Component, inject, input ,output} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RegisterCreds } from '../../../../types/User';
import { AccountService } from '../../../account-service';

interface User {
  id: number;
  displayName: string;
}
@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  cancleRegister = output<boolean>();
    
 private accountService = inject(AccountService);
  protected creds = {} as RegisterCreds;
register() {
  console.log("Register method started");
  console.log(this.creds);

  this.accountService.register(this.creds).subscribe({
    next: response => {
      console.log("SUCCESS", response);
      this.cancel();
    },
    error: error => {
  console.log("FULL ERROR:", error);
  console.log("ERROR BODY:", error.error);
}
  });
}
  cancel() {
    this.cancleRegister.emit(false);
    }
  
}
