import { Component, OnInit,NgModule,Injectable,OnChanges, AfterViewInit, SimpleChanges } from '@angular/core';
import {ToasterContainerComponent, ToasterService, ToasterConfig} from 'angular2-toaster';
import { Router} from '@angular/router';
 import { GlobalService } from './GlobalService';
declare var $:any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  public toasterconfig : ToasterConfig = 
      new ToasterConfig({
          showCloseButton: true, 
          tapToDismiss: false, 
          timeout: 2000
      });
 
	constructor( private global_service:GlobalService,private router: Router){

	}
    

  	ngOnInit() { }
}
