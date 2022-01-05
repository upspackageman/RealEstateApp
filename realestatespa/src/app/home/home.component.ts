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
          style({ backgroundImage: "url(https://images.unsplash.com/photo-1512916958891-fcf61b2160df?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1171&q=80)", offset: 0 }),
          style({ backgroundImage: "url(https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80)", offset: 0.05 }),
          style({ backgroundImage: "url(https://images.unsplash.com/photo-1512916958891-fcf61b2160df?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1171&q=80)", offset: 0.1 }),
          style({ backgroundImage: "url(https://cdnparap00.paragonrels.com/ParagonImages/Property/p0/SDMLS/210022011/11/1200/900/d86338c1e315388778c8acdc8e120621/3/d259c93fc35f08dea61f42d78b5663f5/210022011.JPG)", offset: 0.15 }),
          style({ backgroundImage: "url(https://cdnparap00.paragonrels.com/ParagonImages/Property/p0/SDMLS/210022011/0/1200/900/d86338c1e315388778c8acdc8e120621/3/d259c93fc35f08dea61f42d78b5663f5/210022011.JPG)", offset: 0.2 }),
          style({ backgroundImage: "url(https://cdnparap00.paragonrels.com/ParagonImages/Property/p0/SDMLS/210022011/6/1200/900/d86338c1e315388778c8acdc8e120621/3/d259c93fc35f08dea61f42d78b5663f5/210022011.JPG)", offset: 0.25 }),
          style({ backgroundImage: "url(https://media.crmls.org/mediaz/5c2f2edc-f5e6-45b9-b494-2ede7bf5a60b.jpg?preset=X-LARGE)", offset: 0.3 }),
          style({ backgroundImage: "url(https://media.crmls.org/mediaz/A0036996-FCA1-47DE-BE63-24E08D6E6846.jpg?preset=X-LARGE)", offset: 0.35 }),
          style({ backgroundImage: "url(https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80)", offset: 0.4 }),
          style({ backgroundImage: "url(http://media.crmls.org/medias/18d2c292-c871-4dbd-9280-6884a6fd665e.jpg?preset=X-LARGE)", offset: 0.45 }),
          style({ backgroundImage: "url(https://cdnparap00.paragonrels.com/ParagonImages/Property/p0/SDMLS/210018948/1/1200/900/f96616b372d288eba369297b700b685c/3/9ce3867b7a08ad77b2bee08735c83d85/210018948.JPG)", offset: .5 }),
          style({ backgroundImage: "url(https://images.unsplash.com/photo-1459780768092-213396a176b9?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1267&q=80)", offset: .55 }),
          style({ backgroundImage: "url(https://images.unsplash.com/photo-1459780768092-213396a176b9?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1267&q=80)",  offset: .60 }),
          style({ backgroundImage: "url(https://images.unsplash.com/photo-1512916958891-fcf61b2160df?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1171&q=80)", offset: .65 }),
          style({ backgroundImage: "url(https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80)", offset: 0.70 }),
          style({ backgroundImage: "url(https://media.crmls.org/mediaz/A0036996-FCA1-47DE-BE63-24E08D6E6846.jpg?preset=X-LARGE)", offset: 0.75 }),
          style({ backgroundImage: "url(https://cdnparap00.paragonrels.com/ParagonImages/Property/p0/SDMLS/210022011/11/1200/900/d86338c1e315388778c8acdc8e120621/3/d259c93fc35f08dea61f42d78b5663f5/210022011.JPG)", offset: 0.8 }),
          style({ backgroundImage: "url(https://cdnparap00.paragonrels.com/ParagonImages/Property/p0/SDMLS/210022011/8/1200/900/d86338c1e315388778c8acdc8e120621/3/d259c93fc35f08dea61f42d78b5663f5/210022011.JPG)", offset: 0.85 }),
          style({ backgroundImage: "url(https://cdnparap00.paragonrels.com/ParagonImages/Property/p0/SDMLS/210018948/1/1200/900/f96616b372d288eba369297b700b685c/3/9ce3867b7a08ad77b2bee08735c83d85/210018948.JPG)", offset: 0.9 }),
          style({ backgroundImage: "url(https://cdnparap00.paragonrels.com/ParagonImages/Property/p0/SDMLS/210022011/11/1200/900/d86338c1e315388778c8acdc8e120621/3/d259c93fc35f08dea61f42d78b5663f5/210022011.JPG)", offset: 0.95 }),
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
  }

 async redirect(){
    await this.router.navigate(['forsale']);
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
