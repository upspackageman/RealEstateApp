import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.showFooter();
  }

  showFooter(){
    
    const link = document.querySelector('app-footer .footer ') as HTMLElement;
    console.log(link);
    link.style.display="flex";
 
}

}
