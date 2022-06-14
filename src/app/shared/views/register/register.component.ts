import { Component, OnInit }                  from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { KuTipService }                       from "@xinyue/core";
import { KuPassportClient }                   from "@xinyue/ui";

@Component({
  selector   : "msp-register",
  templateUrl: "./register.component.html",
})
export class RegisterComponent implements OnInit {

  form1: FormGroup;
  submitting = false;

  constructor(
    private formBuilder: FormBuilder,
    private client: KuPassportClient,
    private tip: KuTipService,
  ) {
    this.form1 = this.formBuilder.group({
      userName   : ["", [Validators.required]],
      displayName: ["", [Validators.required]],
      mobile     : ["", Validators.required],
      password   : ["", Validators.required],
      password2  : ["", Validators.required],
      vcode      : ["", Validators.required],
    });
  }

  ngOnInit(): void {
  }

  doSendCode(): void {
    if (!this.form1.value.mobile) {
      this.tip.error("请填写手机号。");
    }
  }

  doSubmit(): void {
    if (this.form1.value) {

    }
  }

}
