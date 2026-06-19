import { CanActivateFn } from '@angular/router';
import { AccountService } from '../../app/account-service';
import { inject} from '@angular/core';
import { ToastService } from '../../app/toast-service';

export const authGuard: CanActivateFn = () => {
  const accountService =inject(AccountService);
  const toast= inject (ToastService);

  if (accountService.currentUser()) return true;
  else {
    toast.error('You Shall Not Pass');
    return false;
  }
};
