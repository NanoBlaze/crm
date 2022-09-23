import { style } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {

  check: boolean = true;

  constructor(public router: Router) { }

  ngOnInit(): void {
   
  }

  
  @Input() collapsed = false;
  @Input() screenWidth = 0;

  getBodyClass(): string {
    let styleClass = '';
    if(this.collapsed && this.screenWidth > 768){
      styleClass = 'body-trimmed';
    } else if (this.collapsed && this.screenWidth <= 768 && this.screenWidth > 0)  {
      styleClass = 'body-md-screen'
    } else if (this.router.url == '/login' || this.router.url == '/register' ){
        styleClass = 'bodyNew'
    }

    return styleClass;
  }

  
}
