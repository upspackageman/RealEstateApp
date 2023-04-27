import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { EmailService } from 'src/app/_services/email.service';

@Component({
  selector: 'app-home-contact',
  templateUrl: './home-contact.component.html',
  styleUrls: ['./home-contact.component.css']
})
export class HomeContactComponent implements OnInit {
  title?: string;
  closeBtnName?: string;
  isSent: boolean = false;
  contact: any = {};
  list: any[] = [];
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  phonePattern = "^(\\+\\d{1,3}( )?)?((\\(\\d{1,3}\\))|\\d{1,3})[- .]?\\d{3,4}[- .]?\\d{4}$";
  config = {
    backdrop: true,
    animated: true,
    class: 'gray modal-lg',

    ignoreBackdropClick: false
  };

  contactForm: UntypedFormGroup;

  constructor(public bsModalRef: BsModalRef, private fb: UntypedFormBuilder, private emailService: EmailService) {
    this.contactForm = fb.group({
      firstName: [null, [Validators.required, Validators.minLength(1)]],
      lastName: [null, [Validators.required, Validators.minLength(1)]],
      email: [null, [Validators.required, Validators.pattern(this.emailPattern)]],
      phone: [null, [Validators.required, Validators.pattern(this.phonePattern)]],
      message: ['']
    });
  }



  ngOnInit(): void {
  }

  sendMail() {
    this.contact.from = this.contactForm.value.email;
    this.contact.firstName = this.contactForm.value.firstName;
    this.contact.lastName = this.contactForm.value.lastName;
    this.contact.phone = this.contactForm.value.phone;
    this.contact.message = this.contactForm.value.message;
    this.contact.subject = "Contact";

    this.emailService.sendContactEmail(this.contact).subscribe({
      next: (_) => {
        this.isSent = true;
        //this.modalRef.hide();
        //this.modalService.show(template,this.config);
        console.log(this.contact);
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      }
    });
    //this.modalService.hide();
  }

  get f() {
    return this.contactForm.controls;
  }


}
