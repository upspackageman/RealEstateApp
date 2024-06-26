import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.about();
    this.showFooter();
  }
  showFooter() {

    const link = document.querySelector('app-footer .footer ') as HTMLElement;
    console.log(link);
    link.style.display = "flex";

  }

  async about() {

    if (!localStorage.getItem('direct')) {
      localStorage.setItem('direct', 'no reload')
      const currentUrl = this.router.url;
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate([currentUrl]);
      });

    } else {
      localStorage.removeItem('direct');
    }
  }

}
