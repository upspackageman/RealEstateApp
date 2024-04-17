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
    }
    else if(this.previousUrl === 'loginregister'){
      this.link = this.previousUrl;
      this.redirect = 'Register';
      
    }
    else{
      this.link ='listing/'+ this.previousUrl;
      this.redirect = 'Return to Listing';
    }

  });
   }

  ngOnInit(): void {
    this.term();
    this.showFooter();
  }

  showFooter(){
    
    const link = document.querySelector('app-footer .footer ') as HTMLElement;
    console.log(link);
    link.style.display="flex";
 
}

  async term() {
    if (!localStorage.getItem('term')) {
      localStorage.setItem('term', 'no reload')
      const currentUrl = this.router.url;
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
    } else {
      localStorage.removeItem('term');
    }
  }

}
