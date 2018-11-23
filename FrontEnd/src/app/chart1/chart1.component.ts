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
  selector: 'app-chart1',
  templateUrl: './chart1.component.html',
  styleUrls: ['./chart1.component.scss']
})
export class Chart1Component implements OnInit {
loading : boolean =false;
title = 'app';
month = [];
price = [];
chart = [];
userForm: FormGroup;

  constructor(private http: Http,
        private route: ActivatedRoute,
        private router: Router,
        private fb: FormBuilder,       
        private global_service : GlobalService,  
        private element: ElementRef,
        private activatedRoute: ActivatedRoute,
        private ng4LoadingSpinnerService: Ng4LoadingSpinnerService) { 
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

  ngOnInit() {
  	 this.getUsersPoints();
  }

  getUsersPoints(){
  	this.chart = [];
  	this.loading=true;
          const url = this.global_service.basePath + 'user/chart1Result';
          this.global_service.GetRequest(url)
          .subscribe((response) => {     
          if(response[0].json.status==200){
          
          response[0].json.result.forEach(y => {
	        this.month.push(y._id.email);
	        this.price.push(y.totalAmount);
	      });

      this.chart = new Chart('canvas', {
        type: 'line',
        data: {
          labels: this.month,
          datasets: [
            {
              data: this.price,
              borderColor: '#3cba9f',
              fill: true
            }
          ]
        },
        options: {
          legend: {
            display: false
          },
          scales: {
            xAxes: [{
              display: true
            }],
            yAxes: [{
              display: true
            }],
          }
        }
      });

          }
      });

  }

   home(){
      this.router.navigateByUrl("/home");
    }

   chart2(){
      this.router.navigateByUrl("/chart2");
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
