import { Component, OnInit,NgModule, ElementRef } from '@angular/core';
declare var $: any;
import { Router, ActivatedRoute,NavigationEnd } from '@angular/router';
import { FormsModule, FormControl, FormBuilder, Validators, FormGroup, ReactiveFormsModule} from '@angular/forms';
import { Http, Headers, RequestOptions, Response  } from '@angular/http';
import { GlobalService } from '../GlobalService';
import { Ng4LoadingSpinnerModule, Ng4LoadingSpinnerService  } from 'ng4-loading-spinner';
import * as moment from 'moment';
declare let ga: Function;
import { Chart } from 'chart.js';


@Component({
  selector: 'app-chart2',
  templateUrl: './chart2.component.html',
  styleUrls: ['./chart2.component.scss']
})
export class Chart2Component implements OnInit {
loading : boolean =false;
title = 'app';
month = [];
price = [];
chart = [];
userForm: FormGroup;
bgColor= [];

  constructor(private http: Http,
        private route: ActivatedRoute,
        private router: Router,
        private fb: FormBuilder,       
        private global_service : GlobalService,  
        private element: ElementRef,
        private activatedRoute: ActivatedRoute,
        private ng4LoadingSpinnerService: Ng4LoadingSpinnerService) { }

 ngOnInit() {
     this.getUsersPoints();
      this.FormInit();
  }

     FormInit(){
      // Login form initilization here------------------------------  
      this.userForm = this.fb.group({
            'email': new FormControl('',Validators.required),
            'name': new FormControl('',Validators.required),
            'point': new FormControl('', Validators.required)
        });
  }

  logout(){
    this.global_service.logout();
  }
  getUsersPoints(){
    this.chart = [];
    const color = ['Red','Yellow','Green','Pink','Violet','Orange','Blue','Skyblue','Black','Brown','Grey'];
    this.loading=true;
          const url = this.global_service.basePath + 'user/chart1Result';
          this.global_service.GetRequest(url)
          .subscribe((response) => {     
          if(response[0].json.status==200){
          response[0].json.result.forEach((y,index) => {
          this.month.push(y._id.email);
          this.price.push(y.totalAmount);
          this.bgColor.push(color[Math.floor(Math.random() * 10)]);
        });

      this.chart = new Chart('canvas', {
        type: 'pie',
        data: {
          labels: this.month,
          datasets: [
            {
              data: this.price,
              backgroundColor : this.bgColor
            }
          ]
        }
      });

          }
      });

  }

   home(){
      this.router.navigateByUrl("/home");
    }

   chart1(){
      this.router.navigateByUrl("/chart1");
    }

    chart3(){
      this.router.navigateByUrl("/chart3");
    }

  submit(value : any){
       this.loading=true;
          const url = this.global_service.basePath + 'user/savePoint';
          this.global_service.PostRequestUnautorized(url , value)
          .subscribe((response) => {     
          if(response[0].json.status==200){
            this.loading=false;
              this.userForm.reset();                    
             this.global_service.showNotification('top','right',response[0].json.message,2,'ti-cross');  
             this.getUsersPoints(); 
               // this.router.navigateByUrl('/dashboard/adminDashboard'); route here for home screen after successfully login
          }else{     
              this.userForm.reset();
              this.loading=false;   
              this.global_service.showNotification('top','right',response[0].json.message,4,'ti-cross');   
          }
        });
    }
 
}
