import { inject } from '@angular/core';
import {Router, CanActivateFn } from '@angular/router';

export const authGuardGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  if(localStorage.getItem('username')){
    return true;
  }else{
    return false;
  }
};
