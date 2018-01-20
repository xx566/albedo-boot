import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {CTX} from "../../../../app.constants";
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../../../service/sys/user/user.service";
import {User} from "../../../../service/sys/user/user.model";

@Component({
    selector: ".sys-user-form.page-form",
    templateUrl: "./user.form.component.html"
})
export class UserFormComponent implements OnInit, OnDestroy, AfterViewInit {

    user: User;
    routerSub: any;
    ctx: any;
    id: any;

    private afterViewInit = false;
    private afterLoad = false;
    constructor(
        private router: ActivatedRoute,
        private userService: UserService) {
        this.ctx = CTX;
        this.user = new User();

    }

    ngOnInit() {
        this.routerSub = this.router.params.subscribe((params) => {
            this.id = params['id'];
            if(this.id){
                this.userService.find(this.id).subscribe((data) => {
                    this.user = data;
                    albedoForm.initFormData("#user-save-form", this.user);
                    this.afterLoad = true;
                    this.initForm();
                });
            }else{
                this.afterLoad = true;
                this.initForm();
            }
        });
    }

    ngOnDestroy() {
        this.routerSub.unsubscribe();
    }

    ngAfterViewInit() {
        // this._script.load('.sys-user-list',
        //     'assets/demo/default/custom/components/datatables/base/data-ajax.js');
        this.afterViewInit = true;
        this.initForm();
    }

    initForm() {
        if(!this.afterViewInit || !this.afterLoad) return;

        var userId = this.user.id;
        albedoForm.initValidate($("#user-save-form"), {
            // define validation rules
            rules: {
                loginId: { remote: CTX + '/sys/user/checkByProperty?_statusFalse&id=' + encodeURIComponent(userId) },
                status: { required: true },
                roleIdList: { required: true },
            },
            messages: {
                loginId: { message: '登录Id已存在' },
            },
        });
        albedoForm.init();
        albedoForm.initSave();


    }



}