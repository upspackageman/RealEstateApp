import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { EmailService } from 'src/app/_services/email.service';

@Component({
  selector: 'app-listing-details-contact',
  templateUrl: './listing-details-contact.component.html',
  styleUrls: ['./listing-details-contact.component.css']
})


export class ListingDetailsContactComponent implements OnInit {

  title?: string;
  closeBtnName?: string;
  listId: string;
  contactAgent: boolean = false;
  contactAgentDisp: string = 'none';
  isSent: boolean = false;
  contact: any = {};
  form: UntypedFormGroup = new UntypedFormGroup({});
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  phonePattern = "^(\\+\\d{1,3}( )?)?((\\(\\d{1,3}\\))|\\d{1,3})[- .]?\\d{3,4}[- .]?\\d{4}$";
  contactForm: UntypedFormGroup;



  constructor(public bsModalRef: BsModalRef, private fb: UntypedFormBuilder, private emailService: EmailService) {
    this.contactForm = fb.group({
      firstName: [null, [Validators.required, Validators.minLength(1)]],
      lastName: [null, [Validators.required, Validators.minLength(1)]],
      email: [null, [Validators.required, Validators.pattern(this.emailPattern)]],
      phone: [null, [Validators.required, Validators.pattern(this.phonePattern)]],
      agentName: [null],
      agentPhone: [null],
      agentEmail: [null],
      message: []
    });

  }


  ngOnInit() {
    this.toContactAgent(false);

  }


  get f() {
    return this.contactForm.controls;
  }

  async toContactAgent(e) {
    this.contactAgent = e.target.checked;
    console.log(this.contactAgent);
  }

  sendMail() {
    this.contact.from = this.contactForm.value.email;
    this.contact.firstName = this.contactForm.value.firstName;
    this.contact.lastName = this.contactForm.value.lastName;
    this.contact.phone = this.contactForm.value.phone;
    this.contact.subject = 'Property Inquiry';
    this.contact.message = this.contactForm.value.message;
    this.contact.listing = this.listId;
    this.contact.agentName = this.contactForm.value.agentName;
    this.contact.agentEmail = this.contactForm.value.agentEmail;
    this.contact.agentPhone = this.contactForm.value.agentPhone;
    console.log(this.contact);
    console.log(this.contact.agentName);
    this.emailService.sendEmail(this.contact).subscribe({
      next: (_) => {
        //this.modalRef.hide();
        this.isSent = true;
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      }
    });
  }



}
