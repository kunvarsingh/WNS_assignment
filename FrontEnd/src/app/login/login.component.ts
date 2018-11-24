import { Component, OnInit,NgModule, ElementRef } from '@angular/core';
declare var $: any;
import { Router, ActivatedRoute,NavigationEnd } from '@angular/router';
import { FormsModule, FormControl, FormBuilder, Validators, FormGroup, ReactiveFormsModule} from '@angular/forms';
import { Http, Headers, RequestOptions, Response  } from '@angular/http';
import { GlobalService } from '../GlobalService';
import { Ng4LoadingSpinnerModule, Ng4LoadingSpinnerService  } from 'ng4-loading-spinner';
import * as moment from 'moment';
declare let ga: Function;
@Component({
  
    selector : 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
   
    loading = false;
    submitted: boolean;
    loginForm: FormGroup;
    registerForm: FormGroup;

    constructor(
        private http: Http,
        private route: ActivatedRoute,
        private router: Router,
        private fb: FormBuilder,       
        private global_service : GlobalService,  
        private element: ElementRef,
        private activatedRoute: ActivatedRoute,
        private ng4LoadingSpinnerService: Ng4LoadingSpinnerService
        ){ 
            this.http = http;
         }

    ngOnInit() {       
      // form initilization here------------------------------
       this.FormInit();
    }

    FormInit(){
      // Login form initilization here------------------------------  
      this.loginForm = this.fb.group({
            'email': new FormControl('',Validators.compose([Validators.required,Validators.pattern(/^[a-zA-Z][-_.a-zA-Z0-9]{3,29}\@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,15}|[0-9]{1,3})(\]?)$/)])),
            'password': new FormControl('', Validators.required)
        });

      //Registration form initilization here------------------------------
      this.registerForm = this.fb.group({
            'email': new FormControl('',Validators.compose([Validators.required,Validators.pattern(/^[a-zA-Z][-_.a-zA-Z0-9]{3,29}\@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,15}|[0-9]{1,3})(\]?)$/)])),
            'password': new FormControl('', Validators.required),
            'username': new FormControl('', Validators.required),
            'confirmpassword': new FormControl('', Validators.required)
        }, { validator: this.matchingPasswords('password', 'confirmpassword') });
    }

    matchingPasswords(passwordKey: string, confirmPasswordKey: string) {       
        return (group: FormGroup): { [key: string]: any } => {
            let password = group.controls[passwordKey];
            let confirmPassword = group.controls[confirmPasswordKey];
            if (password.value !== confirmPassword.value) {
                return {
                    mismatchedPasswords: true
                };
            }
        }
    }

      login(value : any){ 
          this.loading=true;
          const url = this.global_service.basePath + 'user/login';
          this.global_service.PostRequestUnautorized(url , value)
          .subscribe((response) => {     
          if(response[0].json.status==200){

            this.loading=false;
              this.loginForm.reset();                    
              localStorage.setItem('currentUser', JSON.stringify(response[0].json.data));
              localStorage.setItem('token', response[0].json.token);
              var user=JSON.parse(localStorage.getItem('currentUser')); 
             this.global_service.showNotification('top','right',response[0].json.message,2,'ti-cross');   
               this.router.navigateByUrl('/chart1');
          }else{     
              this.loginForm.reset();
              this.loading=false;   
              this.global_service.showNotification('top','right',response[0].json.message,4,'ti-cross');   
          }
        });
    }
    
    register(value:any){
       this.loading=true;
      debugger;
          const url = this.global_service.basePath + 'user/registration';
          this.global_service.PostRequestUnautorized(url , this.registerForm.value)
        .subscribe((response) => {     
          if(response[0].json.status==200){
            
            this.loading=false;
            this.registerForm.reset();                    
            this.global_service.showNotification('top','right',response[0].json.message,2,'ti-cross');    
          }else{     
              this.loginForm.reset();
               this.ng4LoadingSpinnerService.hide();  
              this.loading=false;   
              this.global_service.showNotification('top','right',response[0].json.message,4,'ti-cross');   
          }
       
        })
    }  

    chart1(){
      this.router.navigateByUrl("/chart1");
    }

    chart2(){
      this.router.navigateByUrl("/chart2");
    }

    chart3(){
      this.router.navigateByUrl("/chart3");
    }
}
