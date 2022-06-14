import { Component, OnInit }                  from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { KuAuthService, KuLoginForm, KuPassportClient }             from "@xinyue/ui";
import { HttpResult, KuConfigService, KuTipService, KuUtilService } from "@xinyue/core";

@Component({
  selector   : "msp-login",
  templateUrl: "./login.component.html",
})
export class LoginComponent implements OnInit {

  form1: FormGroup;
  submitting = false;
  loginType = "PWD";

  constructor(
    private formBuilder: FormBuilder,
    private client: KuPassportClient,
    private authService: KuAuthService,
    private utilService: KuUtilService,
    private tip: KuTipService,
    private config: KuConfigService,
  ) {
    this.form1 = this.formBuilder.group({
      username: ["", [Validators.required]],
      password: ["", Validators.required],
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void {

    if (!this.submitting) {
      if (this.form1.valid) {

        const submitForm: KuLoginForm = {
          username: this.form1.get("username")?.value,
          password: this.form1.get("password")?.value,
          type    : this.loginType,
        };

        this.submitting = true;
        this.client.loginToken(submitForm).subscribe((result: HttpResult<string>) => {
          if (result.success) {
            this.authService.loginAdapter(result.data);
            this.utilService.navigateAfter([this.config.homeUrl()]);
          } else {
            this.submitting = false;
            this.tip.error(result.message ?? "登录失败。");
          }
        });
      } else {
        this.tip.error("请输入账号名及密码。", "未通过验证");
      }
    }
  }
}
