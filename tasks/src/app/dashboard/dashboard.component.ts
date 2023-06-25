import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  template: `
    <p>dashboard works!</p>
    <router-outlet></router-outlet>
  `,
  styles: [],
})
export class DashboardComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
