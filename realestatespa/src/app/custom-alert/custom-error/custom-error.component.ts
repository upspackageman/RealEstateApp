import { Component, Input } from '@angular/core';
import { animate, keyframes, state, style, transition, trigger} from "@angular/animations";
import { Toast, ToastrService, ToastPackage } from "ngx-toastr";

@Component({
  selector: 'app-custom-error',
  templateUrl: './custom-error.component.html',
  styleUrls: ['./custom-error.component.css'],
  animations: [
    trigger("flyInOut", [
      state(
        "inactive",
        style({
          display: "none",
          opacity: 0
        })
      ),
      transition(
        "inactive => active",
        animate(
          "400ms ease-out",
          keyframes([
            style({
              opacity: 0
            }),
            style({
              opacity: 1
            })
          ])
        )
      ),
      transition(
        "active => removed",
        animate(
          "400ms ease-out",
          keyframes([
            style({
              opacity: 1
            }),
            style({
              transform: "translate3d(10%, 0, 0) skewX(10deg)",
              opacity: 0
            })
          ])
        )
      )
    ])
  ],
  preserveWhitespaces: true
})

export class CustomErrorComponent extends Toast {
  // used for demo purposes
  undoString = "undo";

  @Input() toast: Toast;

  // constructor is only necessary when not using AoT
  constructor(
    protected toastrService: ToastrService,
    public toastPackage: ToastPackage
  ) {
    super(toastrService, toastPackage);
  }

  action(event: Event) {
    event.stopPropagation();
    this.undoString = "undid";
    this.toastPackage.triggerAction();
    return false;
  }
}
