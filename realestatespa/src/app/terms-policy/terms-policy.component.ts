import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-terms-policy',
  templateUrl: './terms-policy.component.html',
  styleUrls: ['./terms-policy.component.css']
})
export class TermsPolicyComponent implements OnInit {
     link:string;
     previousUrl: string;
     redirect:string;
  constructor(private router:Router, private route: ActivatedRoute) {
    router.events
  .pipe(filter(event => event instanceof NavigationEnd))
  .subscribe((event: NavigationEnd) => {
    console.log('prev:', event);
    console.log('prev:', router);
    console.log(this.route.snapshot.paramMap.get('id'))
    this.previousUrl = this.route.snapshot.paramMap.get('id');
    if(this.previousUrl === 'login'){
        this.link =  this.previousUrl;
        this.redirect = 'Login';
        console.log(this.link);
    }
    else if(this.previousUrl === 'loginregister'){
      this.link = this.previousUrl;
      this.redirect = 'Register';
      console.log(this.link);
    }
    else{
      this.link ='listing/'+ this.previousUrl;
      this.redirect = 'Return to Listing';
      console.log(this.link);
    }

    
  });
   }

  ngOnInit(): void {
  }

}
