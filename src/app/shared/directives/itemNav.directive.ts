import {Component, ViewRef, Directive,DoCheck,OnChanges,OnInit,Input}  from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
    selector: "nav-item",
    templateUrl: 'itemNav-template.html'
    
})

export class NavTimeDirective implements DoCheck, OnChanges, OnInit{
    constructor(
        //  private disableNav : boolean
        private router: Router,
        private route: ActivatedRoute,
    ){}
    // @Input() navProperty:any;
    navProperty :any={};
    ngOnInit(){
    this.navProperty = JSON.parse(localStorage.getItem('navProp'));
    if(this.navProperty==undefined){
            this.disableNav = true;
        }
    }
    ngOnChanges(){
    }
    
          disableNav : boolean;  
          disableLeft :boolean;
          disableRight:boolean;
    
    previous () {
        if (this.navProperty.currentItem == 0)
            return;
        this.checkForDisableNavButton('left');
    };

    next () {
        if (this.navProperty.currentItem == this.navProperty.navItems.length - 1) {
            return;
        }
        this.checkForDisableNavButton('right');
    };
    expand () {
        $('#ml').toggle(200, function () {
        $('.icon-enlarge2').toggle();
        $('.icon-shrink2').toggle();
            });
    };

    disableNavButton () {
        if(this.navProperty==undefined){
            this.disableNav=true
            return
        }
        if (this.navProperty.navItems.length == 1) {
            this.disableNav=true
            this.disableLeft=true
            this.disableRight=true
            return
        }
        if (this.navProperty.currentItem == 0) {
            this.disableLeft = true;
            this.disableRight = false;                    
        }
        
        if (this.navProperty.currentItem == this.navProperty.navItems.length - 1) {
            this.disableLeft = false;
            this.disableRight = true;
        }
        if (this.navProperty.currentItem >0 && this.navProperty.currentItem <this.navProperty.navItems.length - 1){
            this.disableLeft=false;
            this.disableRight=false;
        }
    };

    ngDoCheck(){
        this.navProperty = JSON.parse(localStorage.getItem('navProp'));
        if(this.navProperty==undefined){
            this.disableNav = true;
            return
        }
        if (this.navProperty.navItems.length > 0) {
                this.disableNav = false; //wait for navItem's id comes
        }
        this.disableNavButton();
    };
            

            //go to appropriate item's state by it's id and disabled nav button when first and
            // last item position reached.
    checkForDisableNavButton (mode) {
        if (this.disableNav)
            return; //bounce back when no item navItems array;

        if (mode == 'left') {
            this.disableLeft = false;
            this.navProperty.currentItem -= 1;
            var params = {};
            params[this.navProperty.stateParamName] = this.navProperty.navItems[this.navProperty.currentItem];
            localStorage.setItem('navProp', JSON.stringify(this.navProperty));
            this.router.navigate(['../'+this.navProperty.navItems[this.navProperty.currentItem]],{ relativeTo: this.route })                    

            if (this.navProperty.currentItem == 0) {
                this.disableLeft = true;
            }
        }
        if (mode == 'right') {
            this.disableRight = false;
            this.navProperty.currentItem += 1;
            let params = {};
            params[this.navProperty.stateParamName] = this.navProperty.navItems[this.navProperty.currentItem];
            localStorage.setItem('navProp', JSON.stringify(this.navProperty));
            this.router.navigate(['../'+this.navProperty.navItems[this.navProperty.currentItem]],{ relativeTo: this.route })                    
            if (this.navProperty.currentItem == this.navProperty.navItems.length - 1) {
                this.disableRight = true;
            }
        }
    };

}