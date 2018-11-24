import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot, Resolve } from '@angular/router';

import { Observable } from 'rxjs/Rx';
import { GlobalService } from './GlobalService';

@Injectable()
export class AuthGuard implements CanActivate {

	constructor(public router: Router, private global_service: GlobalService){ }

	canActivate(){
		debugger
		if(localStorage.getItem('currentUser'))
			return true;
		else{
			this.router.navigateByUrl('/home');
			this.global_service.showNotification('top','right',"Please login!.",4,'ti-cross');   	
			return false;
		}
	}
}





