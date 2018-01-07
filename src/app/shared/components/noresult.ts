import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'no-result',
    template: `<div style="padding:20px;height:100%" *ngIf="!data || data.length==0" >
                    <div class="blank-slate-pf " style="height:100%"  >
                        <div class="blank-slate-pf-icon">
                            <span class="pficon pficon pficon-warning-triangle-o"></span>
                        </div>
                        <h1>
                        {{ 'administration_noResults_label' | translate }}
                        </h1>
                    </div>
                </div>
                `
})

export class NoResultComponent implements OnInit {

    @Input() data:any = [];
    constructor() { }

    ngOnInit() { }
}