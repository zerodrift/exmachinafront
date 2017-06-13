/**
 * Created by jisaac1 on 6/11/17.
 */
import {MdButtonModule, MdCheckboxModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {NgModule} from "@angular/core";

@NgModule({
    imports: [MdButtonModule, MdCheckboxModule, BrowserAnimationsModule],
    exports: [MdButtonModule, MdCheckboxModule, BrowserAnimationsModule],
})
export class MyMaterialModule { }
