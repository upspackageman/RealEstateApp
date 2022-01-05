import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test-errors',
  templateUrl: './test-errors.component.html',
  styleUrls: ['./test-errors.component.css']
})
export class TestErrorsComponent implements OnInit {

  baseUrl = 'https://127.0.0.1:5001/api/';
  validationErrors:string[]=[];

  constructor(private http: HttpClient) { }
 
  ngOnInit(): void {
  }

  get404Error(){
    this.http.get(this.baseUrl + 'bugger/not-found').subscribe(response =>{
      console.log(response); 
    }, error => {
      console.log(error);
    })
  }

  get400Error(){
    this.http.get(this.baseUrl + 'bugger/bad-request').subscribe(response =>{
      console.log(response); 
    }, error => {
      console.log(error);
    })
  }

  get500Error(){
    this.http.get(this.baseUrl + 'bugger/server-error').subscribe(response =>{
      console.log(response); 
    }, error => {
      console.log(error);
    })
  }

  get401Error(){
    this.http.get(this.baseUrl + 'bugger/auth').subscribe(response =>{
      console.log(response); 
    }, error => {
      console.log(error);
    })
  }

  get400ValidationError(){
    this.http.post(this.baseUrl + 'account/register',{}).subscribe(response =>{
      console.log(response); 
    }, error => {
      console.log(error);
      this.validationErrors = error;
    })
  }
}
