import { Injectable, EventEmitter, Input, Output } from '@angular/core';
import { Http, Response, RequestOptions, Headers, Request, RequestMethod } from '@angular/http';
import { Route, Router } from "@angular/router";
import { FormControl } from '@angular/forms'
import { ToasterContainerComponent, ToasterService, ToasterConfig} from 'angular2-toaster';
import { Observable } from 'rxjs/Rx';
import * as Rx from 'rxjs/Rx';
import 'rxjs/add/observable/of';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
declare var $: any;

@Injectable()
export class GlobalService {       
   private toasterService: ToasterService; 
    user:any;
    userInfo: any;
    userType:any;
    public basePath: string;
    public basePathforReact: string;
    public refresh_token: string;  
    public headers: Headers;
    public requestoptions: RequestOptions;
    public res: Response;  

    constructor(
                public http: Http,
                public router: Router,
                 toasterService:ToasterService) {
        this.extarsOnLoad();
        this.toasterService = toasterService
    }

    showNotification(from, align,message, type, body) {
        this.toasterService.clear();
         if(type==2){
          this.toasterService.pop('success', "", message);
         }
         if(type==4){
          this.toasterService.pop('error', "", message);
         }
         if(type==3){
          this.toasterService.pop('success', "", message);
         }
          
    }

    public extarsOnLoad() {      
        this.basePath = "http://localhost:9000/";
    }

    public getRequsetOptions(url: string): RequestOptions {
        let headers;
        if (localStorage.getItem('token')) {
            let userInfo = JSON.parse(localStorage.getItem('userInfo'));
            if(userInfo){
                headers = new Headers();
                headers.append("Content-Type", "application/json");
                headers.append("token",this.userInfo.token);
            }
        }
        else {
             }
        let requestoptions = new RequestOptions({
            method: RequestMethod.Get,
            url: url,
            headers: headers
        });
        return requestoptions;
    }

  

    public PostRequestUnautorized(url?: string, data?: any): any {
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        let requestoptions = new RequestOptions({
            method: RequestMethod.Post,
            url: url,
            headers: headers,
            body: data
        });

        return this.http.request(new Request(requestoptions))
        .map((res: Response) => {
            return [{ status: res.status, json: res.json() }]
        })
        .catch((error: any) => {
            return Observable.throw(error);
        });
    }

    public PostRequest(url: string, data: any, flag?: any): any {
        var TOKEN=localStorage.getItem('token');
        let headers;
        headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("authorization","jwt "+TOKEN);
        this.requestoptions = new RequestOptions({
            method: RequestMethod.Post,
            url: url,
            headers: headers,
            body: JSON.stringify(data)
        })

        return this.http.request(new Request(this.requestoptions))
        .map((res: Response) => {
            if(res.status==200){
               return [{ status: res.status, json: res }]
            }
        })
        .catch((error: any) => {
            if(error.status == 401){
                localStorage.clear();
                this.showNotification('top','right',error.json().err.object,4,'ti-cross');
                this.router.navigateByUrl('/login');
            }
             if(error.status===0){
               this.showNotification('top','right','Unable to reached the resources',4,'ti-cross');
           }
            return Observable.throw(error);
        });
    }

    public GetRequest(url: string): any {
        return this.http.request(new Request(this.getRequsetOptions(url)))
        .map((res: Response) => {
            let jsonObj: any;
            if (res.status === 204) {
                jsonObj = null;
            }
            else {
                jsonObj = res.json()
            }
            return [{ status: res.status, json: jsonObj }]
        })
        .catch(error => {
            if (error.status == 0)
            return Observable.throw(error);
        });
    }

  logout(){
    localStorage.clear();
    this.router.navigateByUrl('/home');
    this.showNotification('top','right',"logout successfully!.",2,'ti-cross');  
  }


 

}
