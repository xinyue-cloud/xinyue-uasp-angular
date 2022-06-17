import { DOCUMENT } from '@angular/common';
import {
  AfterContentInit,
  Component,
  ContentChildren,
  EventEmitter,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
  TemplateRef,
}                   from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  Validators,
}                            from '@angular/forms';
import {
  KuConfigService,
  KuTipService,
  KuUtilService,
  HttpResult,
}                            from '@xinyue/core';
import { KuContentTemplate } from '@xinyue/ui';

import { KuLoginForm }      from '../../../model';
import { KuPassportClient } from '../../../clients';
import { KuAuthService }    from '../../../services';

const CLASS_LOGIN_PAGE = ['login-page', 'pace-primary'];

@Component({
  selector   : 'ku-login',
  templateUrl: './login.component.html',
})
export class KuLoginComponent implements OnInit, OnDestroy, AfterContentInit {

  @Input() title = '登录系统';
  @Input() socialAuth = true;
  @Input() allowRegister = true;

  @Output() onSubmitBefore: EventEmitter<KuLoginForm> = new EventEmitter<any>();
  @Output() onSubmitAfter: EventEmitter<KuLoginForm> = new EventEmitter<any>();

  originalClass: String[] = [];
  loginForm: FormGroup;
  loading = false;

  @ContentChildren(KuContentTemplate) templates!: QueryList<any>;
  logoTemplate!: TemplateRef<any>;
  titleTemplate!: TemplateRef<any>;
  socialTemplate!: TemplateRef<any>;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private formBuilder: FormBuilder,
    private tokenClient: KuPassportClient,
    private authService: KuAuthService,
    private tipService: KuTipService,
    private utilService: KuUtilService,
    private config: KuConfigService,
  ) {
    document.body.classList.forEach(cls => {
      this.originalClass.push(cls);
    });
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', Validators.required],
      remember: false,
    });
  }

  ngOnInit(): void {
    CLASS_LOGIN_PAGE.forEach((cls) => {
      if (!this.document.body.classList.contains(cls)) {
        this.document.body.classList.add(cls);
      }
    });
  }

  onSubmit(event: Event, form: any): void {

    const submitForm: KuLoginForm = {
      username: this.loginForm.get('username')?.value,
      password: this.loginForm.get('password')?.value,
    };

    this.onSubmitBefore.emit(submitForm);

    this.loading = true;
    this.tokenClient.loginToken(submitForm).subscribe((result: HttpResult<string>) => {
      this.loading = false;
      if (result.success) {
        this.authService.loginAdapter(result.data);
        this.utilService.navigateAfter([this.config.homeUrl()]);
        this.onSubmitAfter.emit(submitForm);
      } else {
        this.tipService.error(result.message ?? '登录失败。');
      }
    });
  }

  ngAfterContentInit(): void {
    this.templates.forEach((item: KuContentTemplate) => {
      switch (item.getType()) {
        case 'logo':
          this.logoTemplate = item.template;
          break;
        case 'title':
          this.titleTemplate = item.template;
          break;
        case 'social':
          this.socialTemplate = item.template;
          break;
      }
    });
  }

  ngOnDestroy(): void {
    CLASS_LOGIN_PAGE.forEach((cls) => {
      if (!this.originalClass.includes(cls) && this.document.body.classList.contains(cls)) {
        this.document.body.classList.remove(cls);
      }
    });
  }
}
