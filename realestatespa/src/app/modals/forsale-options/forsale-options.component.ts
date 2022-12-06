import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-forsale-options',
  templateUrl: './forsale-options.component.html',
  styleUrls: ['./forsale-options.component.css']
})
export class ForsaleOptionsComponent implements OnInit {
  title?: string;
  closeBtnName?: string;
  list: any[] = [];

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit(): void {
  }


}
