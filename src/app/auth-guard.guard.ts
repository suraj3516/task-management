import { inject } from '@angular/core';
import {Router, CanActivateFn } from '@angular/router';

export const authGuardGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const navigation = router.getCurrentNavigation();
  console.log('URL - ',navigation?.extractedUrl.toString());
  if(navigation && navigation.extractedUrl.toString() == '/dashboard')
    {
      console.log('URL - ',navigation.extractedUrl.toString());
      if(localStorage && localStorage.getItem('username') == 'admin@abc.com'){
        return true;
      }
      else{
        console.log('please login as admin!!!!');
        return false;
      }
    }
    else{
      if(localStorage && localStorage.getItem('username')){
        return true;
      }else{
        return false;
      }
    }
  
};
