import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirmation-sent',
  templateUrl: './confirmation-sent.component.html',
  styleUrls: ['./confirmation-sent.component.css']
})
export class ConfirmationSentComponent implements OnInit {

  constructor(private router: Router,) { }

  ngOnInit(): void {
    this.confirm();
    this.showFooter();
  }

  showFooter(){
    
    const link = document.querySelector('app-footer .footer ') as HTMLElement;
    console.log(link);
    link.style.display="flex";
 
}

  async confirm() {

    if (!localStorage.getItem('confirm')) {
      localStorage.setItem('confirm', 'no reload')
      const currentUrl = this.router.url;
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });

    } else {
      localStorage.removeItem('confirm');
    }
  }

}
