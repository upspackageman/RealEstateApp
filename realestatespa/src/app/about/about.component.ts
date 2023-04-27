import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.about();
  }
  async about() {

    if (!localStorage.getItem('direct')) {



      localStorage.setItem('direct', 'no reload')
      setTimeout(() => {
        location.reload();
      }
        , 1);

    } else {
      localStorage.removeItem('direct');








    }
  }

}
