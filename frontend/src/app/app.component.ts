import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Product Search App';
  searchControl = new FormControl('');

  
  constructor() {
    console.log('App component loaded');
  }
}
