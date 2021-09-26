import {Component} from '@angular/core';
import 'ng-owner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  owner: ''
})
export class AppComponent {
  title = 'ng-owner-extension';
}
