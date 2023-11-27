import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-builder-listings',
  templateUrl: './builder-listings.component.html',
  styleUrls: ['./builder-listings.component.css']
})
export class BuilderListingsComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.builder();
  }

  async builder() {

    if (!localStorage.getItem('builder')) {
      localStorage.setItem('builder', 'no reload')
      const currentUrl = this.router.url;
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });

    } else {
      localStorage.removeItem('builder');
    }
  }

}
