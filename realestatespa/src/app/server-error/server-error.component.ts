import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-server-error',
  templateUrl: './server-error.component.html',
  styleUrls: ['./server-error.component.css']
})
export class ServerErrorComponent implements OnInit {
  error:any;

  constructor(private router:Router) { 
    const navigation = this.router.getCurrentNavigation();
    this.error = navigation?.extras?.state?.erro;
  }

  ngOnInit(): void {
    this.showFooter();
  }

  showFooter(){
    
    const link = document.querySelector('app-footer .footer ') as HTMLElement;
    console.log(link);
    link.style.display="flex";
 
}

}
