import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {ScriptLoaderService} from "./base/service/script-loader.service";
import {ModuleService} from "./sys/module/module.service";
import {UserService} from "../auth/_services";
import {HasAnyAuthorityDirective} from "../auth/_services/has-any-authority.directive";
import {AlbedoBootSharedCommonModule} from "./shared-common.module";


@NgModule({
    imports: [
        AlbedoBootSharedCommonModule
    ],
    declarations: [
        HasAnyAuthorityDirective
    ],
    providers: [
        ScriptLoaderService,
        UserService,
        ModuleService
    ],
    entryComponents: [],
    exports: [
        AlbedoBootSharedCommonModule,
        HasAnyAuthorityDirective
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class AlbedoBootSharedModule { }