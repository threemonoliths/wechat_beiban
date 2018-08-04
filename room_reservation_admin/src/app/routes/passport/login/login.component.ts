import { SettingsService } from '@delon/theme';
import { Component, OnDestroy, Inject, Optional } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';
import { SocialService, SocialOpenType, ITokenService, DA_SERVICE_TOKEN } from '@delon/auth';
import { ReuseTabService, ReuseTabMatchMode } from '@delon/abc';
import { environment } from '@env/environment';

import { AuthenticationService } from '../service/login.service';

@Component({
    selector: 'passport-login',
    templateUrl: './login.component.html',
    styleUrls: [ './login.component.less' ],
    providers: [ SocialService ]
})
export class UserLoginComponent implements OnDestroy {

    form: FormGroup;
    error = '';
    type = 0;
    loading = false;

    invalidlogin = false;

    constructor(
        fb: FormBuilder,
        private router: Router,
        public msg: NzMessageService,
        private settingsService: SettingsService,
        private socialService: SocialService,
        private loginService: AuthenticationService,
        @Optional() @Inject(ReuseTabService) private reuseTabService: ReuseTabService,
        @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService) {
        
        // 不路由复用
        // this.reuseTabService.mode = ReuseTabMatchMode.URL
        // let reg: RegExp = /.*passport.*/
        // this.reuseTabService.excludes = [reg]

        this.form = fb.group({
            // project: [null, [Validators.required, Validators.minLength(4)]],
            user_name: [null, [Validators.required]],
            password: [null, Validators.required],

            remember: [true]
        });
    }

    // region: fields
    // get project() { return this.form.controls.project; }
    get user_name() { return this.form.controls.user_name; }
    get password() { return this.form.controls.password; }



    // region: get captcha

    count = 0;
    interval$: any;

    // endregion

    submit() {
        this.error = '';

        this.user_name.markAsDirty();
        this.password.markAsDirty();
        if (this.user_name.invalid || this.password.invalid) return;

        this.loading = true;
        this.loginService.login(this.form.value)
            .subscribe(result => {
                if (result) {
                    this.loading = false;
                    this.router.navigate(['dashboard/v1']);
                } else{
                    this.loading = false;
                    this.invalidlogin = true;
                }
            }, 
            err => {
                this.msg.error(err);
            });
    }

    onChange(){
        this.invalidlogin = false
    }

    ngOnDestroy(): void {
        if (this.interval$) clearInterval(this.interval$);
    }

}
