import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {trigger,style, transition, animate, keyframes, query, stagger, state} from '@angular/animations';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations:[
    trigger('banner',[
      state('in', style({backgroundImage: "url(https://images.unsplash.com/photo-1512916958891-fcf61b2160df?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1171&q=80"})),
      state('out', style({backgroundImage: "url(https://images.unsplash.com/photo-1459780768092-213396a176b9?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1267&q=80)"})),
      transition('*=>*', [
        animate("70s", keyframes([
          style({ backgroundImage: "url(https://images.unsplash.com/photo-1512916958891-fcf61b2160df?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1171&q=80)",
           offset: 0 },),
          style({ backgroundImage: "url(https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80)", offset: 0.05 }),
          style({ backgroundImage: "url(https://images.unsplash.com/photo-1512916958891-fcf61b2160df?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1171&q=80)", offset: 0.1 }),
          style({ backgroundImage: "url(https://images.unsplash.com/photo-1630650233871-35a35ff27095?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=871&q=80)", offset: 0.15 }),
          style({ backgroundImage: "url(https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80)", offset: 0.2 }),
          style({ backgroundImage: "url(https://cdnparap00.paragonrels.com/ParagonImages/Property/p0/SDMLS/210022011/6/1200/900/d86338c1e315388778c8acdc8e120621/3/d259c93fc35f08dea61f42d78b5663f5/210022011.JPG)", offset: 0.25 }),
          style({ backgroundImage: "url(https://images.unsplash.com/photo-1565538810643-b5bdb714032a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80)", offset: 0.3 }),
          style({ backgroundImage: "url(https://images.unsplash.com/photo-1556909172-54557c7e4fb7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80)", offset: 0.35 }),
          style({ backgroundImage: "url(https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80)", offset: 0.4 }),
          style({ backgroundImage: "url(https://images.unsplash.com/photo-1600573472550-8090b5e0745e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80)", offset: 0.45 }),
          style({ backgroundImage: "url(https://cdnparap00.paragonrels.com/ParagonImages/Property/p0/SDMLS/210018948/1/1200/900/f96616b372d288eba369297b700b685c/3/9ce3867b7a08ad77b2bee08735c83d85/210018948.JPG)", offset: .5 }),
          style({ backgroundImage: "url(https://images.unsplash.com/photo-1459780768092-213396a176b9?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1267&q=80)", offset: .55 }),
          style({ backgroundImage: "url(https://images.unsplash.com/photo-1459780768092-213396a176b9?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1267&q=80)",  offset: .60 }),
          style({ backgroundImage: "url(https://images.unsplash.com/photo-1512916958891-fcf61b2160df?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1171&q=80)", offset: .65 }),
          style({ backgroundImage: "url(https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80)", offset: 0.70 }),
          style({ backgroundImage: "url(https://images.unsplash.com/photo-1630650228493-a60075b9e8e0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80)", offset: 0.75 }),
          style({ backgroundImage: "url(https://images.unsplash.com/photo-1512916194211-3f2b7f5f7de3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80)", offset: 0.8 }),
          style({ backgroundImage: "url(https://images.unsplash.com/photo-1416331108676-a22ccb276e35?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=867&q=80)", offset: 0.85 }),
          style({ backgroundImage: "url(https://images.unsplash.com/photo-1604014238312-ccb88904fa7c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80)", offset: 0.9 }),
          style({ backgroundImage: "url(https://images.unsplash.com/photo-1505873242700-f289a29e1e0f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=876&q=80)", offset: 0.95 }),
          style({backgroundImage: "url(https://images.unsplash.com/photo-1512916958891-fcf61b2160df?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1171&q=80)", offset: 1})


        ]))
      ])

    ])
  ]
})

export class HomeComponent implements OnInit {
  state = 'in';

  constructor(public accountService: AccountService, private router: Router) { }

  ngOnInit() {
   this.home();
  }

 async redirect(){
    await this.router.navigate(['forsale']);
  }

  async home(){
   await  window.scroll(0,0);
  }


  onEnd(event) {
    this.state = 'in';
    if (event.toState === 'in') {
      setTimeout(() => {
        this.state = 'out';
      }, 0);
    }
  }

}
